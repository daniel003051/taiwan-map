<script setup lang="ts">
import { useDateFormat } from "@vueuse/core"
import TaiwanMap from '@/components/TawianMap.vue'
import { NDatePicker, NNumberAnimation, NTag } from "naive-ui"
import { onBeforeMount, provide, ref } from "vue"
import { getOrder } from "./api/index"

const currentCity = ref("台北市")
const rangeTime = ref<[number, number]>([Date.now(), Date.now()])
const totalPrice = ref<number>(0)
const orderRecords = ref<KintoneTypes.Order[]>([])

// 時間格式轉換
const dateFormat = (time: number) => {
  return useDateFormat(time, 'YYYY-MM-DD').value
}

// 點選地圖縣市後
const changeCity = (city: string) => {
  currentCity.value = city
  getFilterRecords()
}

const calcTotalPrice = (data: KintoneTypes.Order[]) => {
  return data.reduce((acc, cur) => {
    return acc + Number(cur.訂單總金額!.value)
  }, 0)
}

const getFilterRecords = async (date: [number, number] = rangeTime.value) => {
  try {
    const [startTime, endTime] = date
    const query = `公司縣市 in ("${currentCity.value}") and 下單時間 >= "${dateFormat(startTime)}" and 下單時間 <= "${dateFormat(endTime)}"`

    const response = await getOrder(query)
    const { records } = response
    orderRecords.value = records
    totalPrice.value = calcTotalPrice(records)

    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

onBeforeMount(() => {
  getFilterRecords()
})

provide("currentCity", currentCity)
provide("changeCity", changeCity)

</script>

<template>
  <div class="box">
    <div class="main-box">
      <div class="detail-box">
        <n-date-picker v-model:value="rangeTime" type="daterange" clearable :on-confirm="getFilterRecords" />
        <h1>{{ currentCity }}</h1>
        <p>總金額：$<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" /></p>
        <p>搜尋到 <n-number-animation ref="numberAnimationInstRef" :from="0" :to="orderRecords.length" /> 筆訂單</p>
        <div class="list">
          <h2>訂單明細：</h2>
          <ul v-if="orderRecords">
            <li v-for="item in orderRecords" :key="item.$id!.value">
              <a :href="`https://daniel.cybozu.com/k/63/show#record=${item.$id!.value}`" target="_blank">
                <n-tag :bordered="false" type="error">
                  id: {{ item.$id?.value }}
                </n-tag>
                  - 訂單總金額: {{ item.訂單總金額?.value }}
              </a>
            </li>
          </ul>
          <p v-if="orderRecords.length === 0">目前沒有訂單</p>
        </div>
      </div>
      <TaiwanMap />
    </div>
    
  </div>
</template>

<style scoped lang="scss">
* {
  color: #fff;
}

.list {
  width: 100%;
  height: 300px;
  border: solid #fff 2px;
  border-radius: 8px;
  padding: 16px;

  h2 {
    font-size: 20px 40px;
  }
  
  .n-collapse {
    color: #fff !important;
  }
}

.box {
  // @include flex();
  width: 100vw;
  background-color: #313125;
  flex-direction: column;
  padding: 4vw;
  box-sizing: border-box;

  .main-box {
    @include flex();
    width: 100%;
  }

  .detail-box {
    @include flex();
    width: 30%;
    flex-direction: column;

    h1 {
      font-size: 40px;
      font-weight: 800;
    }
  }
}
</style>
