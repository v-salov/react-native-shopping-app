
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {ProductType} from "../store/types";

export type MainStackParamList = {
    Home: undefined
    Card: { cardId: string; name: string; date: Date }
    Create: {screen: string, params: { idCard: string }}
}

export type CreateStackParamList = {
    AddProduct: {idCard: string, id?: string}
    CreateCard:  undefined
    CreateProduct: undefined
    Products: {products: ProductType[], idTemp: string | null }
}

export type MainNavProps<T extends keyof MainStackParamList> = {
    navigation: StackNavigationProp<MainStackParamList, T>;
    route: RouteProp<MainStackParamList, T>;
};

export type CreateNavProps<T extends keyof CreateStackParamList> = {
  navigation: StackNavigationProp<CreateStackParamList, T>
  route: RouteProp<CreateStackParamList, T>
}
