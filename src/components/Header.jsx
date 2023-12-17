'use client'

import { Button, DarkThemeToggle, Flowbite } from 'flowbite-react';
import Login from './Login';
import { useEffect, useState } from 'react';
import Logout from './Logout';

export default function Header({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        var usr = localStorage.getItem("user");
        if (usr) setUser(true);
    }, []);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full mx-auto py-2.5 px-4 rounded-lg">
                <div className='flex flex-row items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white'>
                    {children}
                    <Logo />
                    <p>BOCAH<span className='text-red-500'>KOS</span></p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <DarkThemeToggle />
                    {user ? <Logout /> : <Login />}
                </div>
            </div>
        </>
    );
}

function Logo() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={32}
            zoomAndPan="magnify"
            viewBox="0 0 375 374.999991"
            height={32}
            preserveAspectRatio="xMidYMid meet"
            className=""
        >
            <defs>
                <clipPath id="306eea3943">
                    <path
                        d="M 18.75 18.75 L 356.25 18.75 L 356.25 356.25 L 18.75 356.25 Z M 18.75 18.75 "
                        clipRule="nonzero"
                    />
                </clipPath>
            </defs>
            <g clipPath="url(#306eea3943)">
                <path
                    className='fill-black dark:fill-white'
                    d="M 181.152344 265.5 L 97.550781 152.582031 L 41.019531 228.9375 C 37.304688 215.765625 35.3125 201.867188 35.3125 187.5 C 35.3125 103.449219 103.453125 35.308594 187.503906 35.308594 C 271.558594 35.308594 339.699219 103.449219 339.699219 187.5 C 339.699219 194.597656 339.210938 201.574219 338.273438 208.414062 L 351.714844 226.570312 C 354.6875 214.03125 356.261719 200.953125 356.261719 187.5 C 356.253906 94.304688 280.703125 18.75 187.5 18.75 C 94.304688 18.75 18.75 94.304688 18.75 187.5 C 18.75 207.804688 22.335938 227.265625 28.90625 245.292969 C 31.28125 251.808594 34.042969 258.128906 37.167969 264.238281 L 48.320312 249.167969 L 97.546875 182.679688 L 174.589844 286.75 L 185.476562 301.445312 L 230.898438 240.089844 L 231.011719 239.933594 L 252.464844 268.910156 L 257.15625 275.242188 L 279.445312 275.242188 L 276.328125 271.027344 L 231.019531 209.828125 L 174.589844 286.75 Z M 122.855469 152.582031 L 185.933594 237.664062 L 216.921875 195.808594 L 195.757812 167.28125 L 230.902344 119.8125 L 326.679688 249.171875 C 303.015625 302.5 249.601562 339.691406 187.5 339.691406 C 132.214844 339.691406 83.820312 310.214844 57.160156 266.125 L 46.59375 280.398438 C 76.785156 326.101562 128.617188 356.253906 187.496094 356.253906 C 253.0625 356.253906 309.890625 318.863281 337.828125 264.242188 C 340.949219 258.132812 343.714844 251.808594 346.085938 245.300781 L 333.972656 228.9375 L 230.902344 89.703125 L 184.355469 152.582031 L 166.242188 152.582031 L 166.242188 143.25 L 151.269531 143.25 L 151.269531 162.878906 L 144.351562 152.582031 Z M 122.855469 152.582031 "
                    fillOpacity={1}
                    fillRule="evenodd"
                />
            </g>
        </svg>
    );
}