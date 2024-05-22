/// <reference types="vite/client" />

declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

declare namespace KintoneTypes {
  interface Base {
    $id?: kintone.fieldTypes.Id;
    $revision?: kintone.fieldTypes.Revision;
    更新人?: kintone.fieldTypes.Modifier;
    建立人?: kintone.fieldTypes.Creator;
    建立時間?: kintone.fieldTypes.CreatedTime;
    記錄號碼?: kintone.fieldTypes.RecordNumber;
    更新時間?: kintone.fieldTypes.UpdatedTime;
    [key: string]: any;
  }

  interface Order extends Base {
    $id?: kintone.fieldTypes.Id;
    下單時間?: kintone.fieldTypes.Date;
    訂單總金額?: kintone.fieldTypes.Calc;
  }
}
