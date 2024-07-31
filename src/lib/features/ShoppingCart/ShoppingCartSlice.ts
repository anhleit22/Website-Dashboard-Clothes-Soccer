'use client';
import { ProductItem } from '@/components/product/Product'
import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
export interface listCart {
 arr: ProductItem[],
 number: {
  numberProduct:number;
  totalProduct:number;
 }
}

const totalCart = () => {
  const number: ProductItem[] = JSON.parse(localStorage.getItem("listItem")!) || [];
 if(number){
 let numberProduct = 0;
 let totalProduct = 0;
 for (let i = 0; i < number.length; i++){
    numberProduct = number[i].quanlityCart + numberProduct;
    totalProduct= number[i].quanlityCart*number[i].price + totalProduct;
  }
  return {
    numberProduct,
    totalProduct
  };
} return 0;
}
let numberList: any;
if (typeof window !== 'undefined') {
  numberList = totalCart();
}
let arr: any;
if (typeof window !== 'undefined') {
  arr = JSON.parse(localStorage.getItem("listItem")!) ;
}

const initialState: listCart = {
    arr: arr || [],
    number:  numberList ||
    {
      numberProduct:0,
      totalProduct:0
    },
}

export const addShoppingSlice = createSlice({
  name: 'addRemoveProduct',
  initialState,
  reducers: {
    addCart: (state , action) => {
      const productInCart = state.arr.find(
        (items) => items.UDK === action.payload.data.UDK
      );
      if(!productInCart){
        const newNumber = state.number.numberProduct + 1;
        const totalProduct = newNumber*action.payload.data.price
        const numberList= {
          numberProduct: newNumber,
          totalProduct: totalProduct
        }
        action.payload.data.quanlityCart = 1;
        return { 
          ...state,
          arr: [...state.arr, action.payload.data],
          number: numberList,
        }
      }
      else {
        let newList= [...state.arr];
        const index = newList.findIndex((item)=> (
          item.UDK === action.payload.data.UDK
          ))
        if(newList[index].quanlityCart !== undefined){ 
          newList[index].quanlityCart =  newList[index].quanlityCart + 1;
          state.number.numberProduct = state.number.numberProduct + 1;
        }
      }
    },
    deleteCart: (state, action )=> {
      const oldList = localStorage.getItem("listItem");
      if(oldList){
        let parsedData = JSON.parse(oldList);
        const objIndex = parsedData.findIndex((obj:ProductItem) =>  obj.UDK === action.payload.data.UDK);
        parsedData.splice(objIndex, 1);
         if(action.payload.data.quanlityCart !== undefined){
             const oldNumber = state.number.numberProduct - action.payload.data.quanlityCart;
             const totalProduct = oldNumber*action.payload.data.price
              const numberList= {
              numberProduct: oldNumber,
              totalProduct: totalProduct
             }
            return {
                ...state,
                 arr: [...parsedData],
                 number: numberList
             };
         }
         else{
            const oldNumber = state.number.numberProduct - 1;
            const totalProduct = oldNumber*action.payload.data.price;
            const numberList= {
              numberProduct: oldNumber,
              totalProduct: totalProduct
             }
            return {
                ...state,
                arr: [...parsedData],
                 number: numberList
             };
        }
        
    }else {console.log("ko co du lieu");
    return {...state}}
    },
    minusCart: (state, action )=> {
      const oldList = localStorage.getItem("listItem");

      if(oldList){
        let parsedData = JSON.parse(oldList);
        const objIndex = parsedData.findIndex((obj:ProductItem) =>  obj.UDK === action.payload.data.UDK);
        parsedData[objIndex].quanlityCart--        
         if(action.payload.data.quanlityCart !== undefined){
             const oldNumber = state.number.numberProduct - 1;
             const totalProduct = oldNumber*action.payload.data.price
              const numberList= {
              numberProduct: oldNumber,
              totalProduct: totalProduct
             }
            return {
                ...state,
                 arr: parsedData,
                 number: numberList
             };
         }
    }else {console.log("ko co du lieu");
    return {...state}}
    }
  },
})
export const { addCart, deleteCart, minusCart } = addShoppingSlice.actions

export const selectProduct = (state: RootState) => state.product

export default addShoppingSlice;