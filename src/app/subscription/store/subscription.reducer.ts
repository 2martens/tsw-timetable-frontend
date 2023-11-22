import {createReducer} from "@ngrx/store";
import {Product} from "../model/product";

export interface SubscriptionState {
  products: Product[]
}

export const initialState: SubscriptionState = {
  products: [
    {
      action: $localize`Get Started`,
      title: $localize`Timetable Free`,
      isRecommended: false,
      prices: {
        monthly: {
          value: '0€',
          lookupKey: 'free_oneoff'
        },
        yearly: {
          value: '0€',
          lookupKey: 'free_oneoff'
        }
      },
      features: [
        $localize`Create formations`,
        $localize`Create 1 route`,
        $localize`Create 1 timetable`,
        $localize`Fetch timetable data for Germany`,
        $localize`Connect trips with formations`,
        $localize`Link trips to form rotations`,
        $localize`View platform allocations`,
        $localize`View depot usage`,
        $localize`View timetable rotations`,
      ]
    },
    {
      action: $localize`Subscribe`,
      title: $localize`Timetable Personal`,
      isRecommended: true,
      prices: {
        monthly: {
          value: '9.99€',
          lookupKey: 'personal_monthly'
        },
        yearly: {
          value: '99€',
          lookupKey: 'personal_yearly'
        }
      },
      features: [
        $localize`Every feature from Timetable Free`,
        $localize`Create unlimited number of routes`,
        $localize`Create unlimited number of timetables`,
        $localize`Add additional services to timetable`
      ]
    }
  ]
};

export const subscriptionReducer = createReducer(
  initialState,
);
