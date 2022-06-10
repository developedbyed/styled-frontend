import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );
  }

  return stripePromise;
};

export default getStripe;
