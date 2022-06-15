import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
import FormPayment from "./FormPayment";

export default function Payment(props) {
  const { productsData, address } = props;
  const stripePromise = loadStripe(STRIPE_TOKEN);

  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment productsData={productsData} address={address} />
        </Elements>
      </div>
    </div>
  );
}
