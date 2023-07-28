"use client";

import federateUserBackend from '@/hooks/useUserBackend';
import { selectUser, setUserData } from '@/redux/features/UserSlice';
import { publicPaths } from '@/utils/app/paths';
import supabase from '@/utils/supabaseClient';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface StartupProps {
  children: ReactNode
}

const Startup = ({children}: StartupProps) => {

  const user = useSelector(selectUser);
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const location = usePathname();
  const [loading, setLoading] = useState(!publicPaths.includes(location));

  const getAPIToken = async (userId: string) => {
    const tokenData = await supabase.from('keys').select().eq('userId', userId).single();
    if (tokenData.error) {
      // could not create or get token
      console.log("could not create or get token", tokenData.error);
      const newTokenData = await supabase.from('keys').upsert({ userId: userId }).select().single();
      setApiKey('done')
      dispatch(setUserData({apiKey: (newTokenData.data?.mindplugKey)}))

    } else {
      setApiKey('done');
      dispatch(setUserData({apiKey: (tokenData.data?.mindplugKey)}))
    }
  }

  const userSession1 = async () => {
    const session = await supabase.auth.getSession();
    const customer = await supabase.from('customers').select().single();
    const user: any = session?.data?.session?.user;
    console.log('user is: ', user)


    dispatch(setUserData({ ...user, loaded: true, isCustomer: !!(customer?.data?.amount) }));
    const redirect = localStorage.getItem('signinRedirect');
    setLoading(false);
    if (redirect) {
      localStorage.removeItem('signinRedirect');
      return router.push(redirect);
    }
    else if (!user?.id && !publicPaths.includes(location)) {
      // it is a secure path, redirect user to login;
      setLoading(false);
      localStorage.setItem('signinRedirect', location);
      return router.push('/signin');
    }
    
    // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
    // Include a property about the signup, like the Signup Type
  }

  useEffect(() => {
    if (publicPaths.includes(location)) setLoading(false);
    userSession1();
  }, [supabase, router]);

  useEffect(() => {
    if (user?.id && !apiKey) getAPIToken(user.id); 
  }, [user])
 

  return (
    <div>
      {loading? 'loading...' : children}
    </div>
  )
}

export default Startup;