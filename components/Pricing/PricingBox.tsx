"use client";
import useUserBackend from "@/hooks/useUserBackend";
import { selectUser } from "@/redux/features/UserSlice";
import { CustomerPlans, billManageURL } from "@/utils/app/customerplans";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface PriceboxTypes {
  price: string,
  duration?: string,
  packageName: string,
  subtitle?: string,
  disabled?: boolean,
  children: React.ReactNode,
  subscribed?: boolean,
  featured?: boolean,
  description?: string,
  planType: string,
  id: string
}

const plans = {
  starter: {
    name: 'Starter',
    color: 'bg-green-500',
    textColor: 'text-green-500'
  },
  custom: {
    name: 'Custom',
    color: 'bg-purple-500',
    textColor: 'text-purple-500'
  }
};

const PricingBox = (props: PriceboxTypes) => {
  const { price, duration, packageName, subtitle, disabled, children, subscribed, featured, description, planType, id } = props;
  const backend = useUserBackend();

  const user = useSelector(selectUser);
  const router = useRouter();
  const handleButtonClick = async () => {
    if (!user.email) return router.push('/signin');
    if (id === CustomerPlans.LITE && !user.isCustomer) return toast.error('Already on lite plan.');
    if (id == CustomerPlans.CUSTOM && user.planType === CustomerPlans.CUSTOM) return toast.error('Can only switch one-time plan');
    else if ((!user.isCustomer || user.planType === CustomerPlans.CUSTOM) || (user.planType !== CustomerPlans.CUSTOM && id === CustomerPlans.CUSTOM)) {
      await backend.post('/stripe/checkoutSession', {
        priceId: id,
        email: user.email,
        userId: user.id
      }).then(res => {
        if (res.data) {
          router.push(res.data)
        }
      });
    } else {
      // manage the plan
      router.push(billManageURL)
    }
    
  };
    

  const featuredText = featured ? 'text-white dark:text-dark' : 'text-dark dark:text-white';

  const getButtonText = () => {
    if (!user.id) return 'Sign in';
    if (user.planType === id) return 'Current plan';
    if (user.planType === CustomerPlans.CUSTOM) return 'Switch plan';
    if (id === CustomerPlans.CUSTOM) return 'Get custom'
    if (user.isCustomer) return 'Manage Subscription';
    else return 'Upgrade'
  }

  if (disabled) {
    return null;
  }

  return (
    <div className="w-full max-w-sm h-[550px] min-w-[300px]">
     
      <div 
        className={`wow fadeInUp h-[550px] relative z-10 border rounded-xl shadow-sm overflow-hidden  shadow-gray-300 ${featured? ' bg-dark dark:bg-white ': ' bg-white dark:bg-dark border-gray'}`}
        data-wow-delay=".1s"
      >
        <div className={`h-4 ${plans[planType].color} w-full`}></div>
        <div className="px-8 py-10">
          <div className={`mb-1 font-medium ${plans[planType].textColor}`}>{plans[planType].name}</div>
          <div className="flex items-center justify-between">
            <h3 className={`price mb-2 text-3xl font-bold ${featuredText}`}>
              $<span className="amount">{price}</span>
              <span className="time text-body-color">/{duration}</span>
            </h3>
            <h4 className={`mb-2 text-xl font-bold ${featuredText}`}>
              {packageName}
            </h4>
          </div>
          <p className="mb-4 text-base text-gray-400">{subtitle}</p>
          <div className=" border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
            <button
              disabled={disabled}
              onClick={handleButtonClick}
              className="flex w-full items-center disabled:bg-gray justify-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                {getButtonText()}
            </button>
          </div>
          <div className={`mb-4 ${featuredText}`}>
            { description }
          </div>
          <div className={`${featuredText}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
