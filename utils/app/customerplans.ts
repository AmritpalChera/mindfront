export const CustomerPlans = {
  LITE: 'lite',
  BASIC: 'basic',
  CUSTOM: 'custom'
}

const development = process.env.NODE_ENV === 'development';

export const billManageURL = development ? 'https://billing.stripe.com/p/login/test_6oE01o7V5gP2f7yaEE' : 'https://billing.stripe.com/p/login/00g8yIgpi7XX9fGdQQ';