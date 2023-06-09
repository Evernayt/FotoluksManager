import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrdersFilter } from "../../models/api/IOrder";
import { INITIAL_FILTER } from "../../constants/states/filter-states";
import { IStatus } from "../../models/api/IStatus";
import { IShop } from "../../models/api/IShop";
import { ALL_SHOPS } from "../../constants/states/shop-states";
import { ALL_STATUSES } from "../../constants/states/status-states";

type OrderState = {
  orders: IOrder[];
  // order: IOrder;
  // beforeOrder: IOrder;
  // activeStatus: IStatus | null;
  // activeSidemenuIndex: number;
  // finishedProductsForCreate: IFinishedProduct[];
  // finishedProductsForUpdate: IFinishedProduct[];
  // finishedProductsForDelete: number[];
  // haveUnsavedData: boolean;
  forceUpdate: boolean;
  filter: IOrdersFilter;
  isLoading: boolean;
  // orderMembersForCreate: IOrderMember[];
  // orderMembersForDelete: number[];
  // favorites: IFavorite[];
  // watchers: IWatcher[];
  search: string;
  disableFilter: boolean;
  selectedStatus: IStatus;
  selectedShop: IShop;
  startDate: string;
  endDate: string;
  iOrderMember: boolean;
};

const initialState: OrderState = {
  orders: [],
  // order: INITIAL_ORDER,
  // beforeOrder: INITIAL_ORDER,
  // activeStatus: { id: 0, name: '', color: '#fff' },
  // activeSidemenuIndex: 0,
  // finishedProductsForCreate: [],
  // finishedProductsForUpdate: [],
  // finishedProductsForDelete: [],
  // haveUnsavedData: false,
  forceUpdate: false,
  filter: INITIAL_FILTER,
  isLoading: false,
  // orderMembersForCreate: [],
  // orderMembersForDelete: [],
  // favorites: [],
  // watchers: [],
  search: "",
  disableFilter: false,
  selectedStatus: ALL_STATUSES,
  selectedShop: ALL_SHOPS,
  startDate: "",
  endDate: "",
  iOrderMember: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
    },
    // setActiveStatus(state, action: PayloadAction<IStatus>) {
    //   state.activeStatus = action.payload;
    // },
    // setActiveSidemenuIndex(state, action: PayloadAction<number>) {
    //   state.activeSidemenuIndex = action.payload;
    // },
    // setBeforeOrder(state, action: PayloadAction<IOrder>) {
    //   state.beforeOrder = action.payload;
    // },
    // setOrder(state, action: PayloadAction<IOrder>) {
    //   state.order = action.payload;
    // },
    // setHaveUnsavedData(state, action: PayloadAction<boolean>) {
    //   state.haveUnsavedData = action.payload;
    // },
    // setOrderUser(state, action: PayloadAction<IUser | null>) {
    //   state.order.user = action.payload;
    // },
    // setPrepayment(state, action: PayloadAction<number>) {
    //   state.order.prepayment = action.payload;
    // },
    // setDeadline(state, action: PayloadAction<string>) {
    //   state.order.deadline = action.payload;
    // },
    // setComment(state, action: PayloadAction<string>) {
    //   state.order.comment = action.payload;
    // },
    // undoOrder(state) {
    //   state.order = state.beforeOrder;
    //   state.finishedProductsForCreate = [];
    //   state.finishedProductsForUpdate = [];
    //   state.finishedProductsForDelete = [];
    //   state.orderMembersForCreate = [];
    //   state.orderMembersForDelete = [];
    // },
    // deleteFinishedProduct(state, action: PayloadAction<number | string>) {
    //   const finishedProducts = state.order.finishedProducts?.filter(
    //     (finishedProduct) => finishedProduct.id !== action.payload
    //   );
    //   state.order.finishedProducts = finishedProducts;

    //   const finishedProductsForCreate = state.finishedProductsForCreate.filter(
    //     (finishedProductForCreate) =>
    //       finishedProductForCreate.id !== action.payload
    //   );
    //   state.finishedProductsForCreate = finishedProductsForCreate;
    // },
    // addFinishedProductsForDelete(state, action: PayloadAction<number>) {
    //   state.finishedProductsForDelete.push(action.payload);
    // },
    // clearOrder(state) {
    //   state.order = INITIAL_ORDER;
    //   state.beforeOrder = INITIAL_ORDER;
    //   state.finishedProductsForCreate = [];
    //   state.finishedProductsForUpdate = [];
    //   state.finishedProductsForDelete = [];
    //   state.orderMembersForCreate = [];
    //   state.orderMembersForDelete = [];
    // },
    // addFinishedProduct(state, action: PayloadAction<IFinishedProduct>) {
    //   state.order.finishedProducts?.unshift(action.payload);
    // },
    // addFinishedProductsForCreate(
    //   state,
    //   action: PayloadAction<IFinishedProduct>
    // ) {
    //   const finishedProductForCreate = state.finishedProductsForCreate.find(
    //     (x) => x.id === action.payload.id
    //   );

    //   if (finishedProductForCreate) {
    //     const finishedProductsForCreate = state.finishedProductsForCreate.map(
    //       (x) => (x.id === action.payload.id ? action.payload : x)
    //     );

    //     state.finishedProductsForCreate = finishedProductsForCreate;
    //   } else {
    //     state.finishedProductsForCreate.push(action.payload);
    //   }
    // },
    // updateFinishedProduct(state, action: PayloadAction<IFinishedProduct>) {
    //   const finishedProducts = state.order.finishedProducts?.map(
    //     (finishedProduct) =>
    //       finishedProduct.id === action.payload.id
    //         ? action.payload
    //         : finishedProduct
    //   );
    //   state.order.finishedProducts = finishedProducts;
    // },
    // addFinishedProductsForUpdate(
    //   state,
    //   action: PayloadAction<IFinishedProduct>
    // ) {
    //   const finishedProductForUpdate = state.finishedProductsForUpdate.find(
    //     (x) => x.id === action.payload.id
    //   );

    //   if (finishedProductForUpdate) {
    //     const finishedProductsForUpdate = state.finishedProductsForUpdate.map(
    //       (x) => (x.id === action.payload.id ? action.payload : x)
    //     );
    //     state.finishedProductsForUpdate = finishedProductsForUpdate;
    //   } else {
    //     state.finishedProductsForUpdate.push(action.payload);
    //   }
    // },
    // saveOrder(state, action: PayloadAction<IOrder>) {
    //   state.beforeOrder = action.payload;
    //   state.finishedProductsForCreate = [];
    //   state.finishedProductsForUpdate = [];
    //   state.finishedProductsForDelete = [];
    //   state.orderMembersForCreate = [];
    //   state.orderMembersForDelete = [];
    // },
    activeFilter(state, action: PayloadAction<IOrdersFilter>) {
      state.filter = {
        ...action.payload,
        isActive: true,
        isPendingDeactivation: false,
      };
    },
    deactiveFilter(state) {
      state.filter = INITIAL_FILTER;
    },
    clearFilter(state) {
      state.filter = { ...INITIAL_FILTER, isPendingDeactivation: true };
    },
    setDisableFilter(state, action: PayloadAction<boolean>) {
      state.disableFilter = action.payload;
    },
    setForceUpdate(state, action: PayloadAction<boolean>) {
      state.forceUpdate = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // addOrderMember(state, action: PayloadAction<IOrderMember>) {
    //   state.order.orderMembers?.push(action.payload);
    // },
    // addOrderMembers(state, action: PayloadAction<IOrderMember[]>) {
    //   state.order.orderMembers?.push(...action.payload);
    // },
    // addOrderMemberForCreate(state, action: PayloadAction<IOrderMember>) {
    //   state.orderMembersForCreate.push(action.payload);
    // },
    // addOrderMembersForCreate(state, action: PayloadAction<IOrderMember[]>) {
    //   state.orderMembersForCreate.push(...action.payload);
    // },
    // deleteOrderMemberByEmployeeId(state, action: PayloadAction<number>) {
    //   const orderMembers = state.order.orderMembers?.filter(
    //     (orderMember) => orderMember.employee.id !== action.payload
    //   );
    //   state.order.orderMembers = orderMembers;
    // },
    // deleteOrderMembers(state) {
    //   state.order.orderMembers = [];
    // },
    // addOrderMemberForDeleteByEmployeeId(state, action: PayloadAction<number>) {
    //   state.orderMembersForDelete.push(action.payload);
    // },
    // addOrderMembersForDeleteByEmployeeIds(
    //   state,
    //   action: PayloadAction<number[]>
    // ) {
    //   state.orderMembersForDelete.push(...action.payload);
    // },
    // updateOrder(state, action: PayloadAction<IOrder>) {
    //   const orders = state.orders.map((order) =>
    //     order.id === action.payload.id ? action.payload : order
    //   );
    //   state.orders = orders;
    // },
    // setFavorites(state, action: PayloadAction<IFavorite[]>) {
    //   state.favorites = action.payload;
    // },
    // addFavorite(state, action: PayloadAction<IFavorite>) {
    //   state.favorites.push(action.payload);
    // },
    // deleteFavoriteById(state, action: PayloadAction<number>) {
    //   const favorites = state.favorites.filter(
    //     (favorite) => favorite.id !== action.payload
    //   );
    //   state.favorites = favorites;
    // },
    // setWatchers(state, action: PayloadAction<IWatcher[]>) {
    //   state.watchers = action.payload;
    // },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSelectedStatus(state, action: PayloadAction<IStatus>) {
      state.selectedStatus = action.payload;
    },
    setSelectedShop(state, action: PayloadAction<IShop>) {
      state.selectedShop = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    setIOrderMember(state, action: PayloadAction<boolean>) {
      state.iOrderMember = action.payload;
    },
    clearState() {
      return initialState;
    },
  },
});

export default orderSlice.reducer;
