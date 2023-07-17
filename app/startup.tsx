"use client";

import { setUserData } from '@/redux/features/UserSlice';
import supabase from '@/utils/supabaseClient';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Startup = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const getAPIToken = async (userId: string) => {
    const tokenData = await supabase.from('keys').select().eq('userId', userId).single();
    if (tokenData.error) {
      // could not create or get token
      console.log("could not create or get token", tokenData.error);
      const newTokenData = await supabase.from('keys').upsert({ userId: userId }).select().single();
      return (newTokenData.data?.mindplugKey);

    } else {
      return (tokenData.data.mindplugKey)
    }
  }

  const userSession1 = async () => {
    const session = await supabase.auth.getSession();
    const customer = await supabase.from('customers').select().single();
    const user: any = session?.data?.session?.user;
    const apiKey = user.id && await getAPIToken(user?.id);
    dispatch(setUserData({ ...user, loaded: true, isCustomer: !!(customer?.data?.amount), apiKey}));
    // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
    // Include a property about the signup, like the Signup Type
  }

  useEffect(() => {
    userSession1();
  }, [supabase, router])
 

  return <div></div>
}

export default Startup;