"use client";

import { selectUser, setUserData } from '@/redux/features/UserSlice';
import { publicPaths } from '@/utils/app/paths';
import backend from '@/utils/axios/backend';
import supabase from '@/utils/supabaseClient';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface StartupProps {
  children: ReactNode
}

const Startup = ({ children }: StartupProps) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const location = usePathname();

  const getAPIToken = async (userId: string) => {
    const tokenData = await supabase.from('keys').select('mindplugKey').eq('userId', userId).single();
    if (tokenData.error) {
      // could not create or get token
      const newTokenData = await supabase.from('keys').upsert({ userId: userId }).select('mindplugKey').single();
      if (newTokenData.error) {
        console.log('could not create new token', newTokenData.error)
      }
      dispatch(setUserData({ apiKey: newTokenData.data?.mindplugKey }))

    } else {
      dispatch(setUserData({ apiKey: tokenData.data?.mindplugKey }))
    }
  }

  

  const userSession1 = async () => {
    const session = await supabase.auth.getSession();
    const customer = await supabase.from('customers').select().single();
    const user: any = session?.data?.session?.user;

    const configs = await backend.get('/configs').then(res => res.data);

    dispatch(setUserData({ ...user, loaded: true, isCustomer: !!(customer?.data?.amount), planType: customer?.data?.plan || 'lite', configs: configs }));
    const redirect = localStorage.getItem('signinRedirect');
    if (redirect && user?.id) {
      localStorage.removeItem('signinRedirect');
      router.push(redirect);
    }
    else if (!user?.id && !publicPaths.includes(location)) {
      // it is a secure path, redirect user to login;
      localStorage.setItem('signinRedirect', location);
      router.push('/signin');
    }
    
    // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
    // Include a property about the signup, like the Signup Type
  }

  useEffect(() => {
    if (!user.id) userSession1();
  }, [location]);

  useEffect(() => {
    if (user?.id) getAPIToken(user.id);
  }, [user?.id])


  const waitForRender = !publicPaths.includes(location) && !user.apiKey;
  const ref = useRef();

  return (
    <div ref={ref}>
      {waitForRender ? 'loading...' : children}
    </div>
  )
}

export default Startup;