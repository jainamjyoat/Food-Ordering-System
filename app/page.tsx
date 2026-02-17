import React from 'react';

export default function FoodDelivery() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181112] dark:text-white min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#1a0b0d]/90 backdrop-blur-md border-b border-[#f4f0f1] dark:border-[#3a1d21]">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">lunch_dining</span>
            </div>
            <h2 className="text-[#181112] dark:text-white text-2xl font-extrabold tracking-tight">
              FoodDelivery
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-[#181112] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Menu
            </a>
            <a
              className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Deals
            </a>
            <a
              className="text-[#181112] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Partner with us
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 h-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">
                search
              </span>
              <span className="text-sm font-semibold text-[#181112] dark:text-white hidden lg:inline">
                Search
              </span>
            </button>
            <button className="relative flex items-center justify-center size-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors group">
              <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">
                shopping_cart
              </span>
              <span className="absolute top-1 right-1 size-2.5 bg-primary rounded-full border-2 border-white dark:border-[#221013]"></span>
            </button>
            <button className="flex items-center justify-center size-10 bg-background-light dark:bg-[#33181c] rounded-lg hover:bg-gray-100 dark:hover:bg-[#452026] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#181112] dark:text-white">
                person
              </span>
            </button>
            <button className="hidden lg:flex px-6 h-10 bg-primary text-white text-sm font-bold rounded-lg items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-primary/20">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="relative w-full rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center bg-gray-900 group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Delicious feast with various dishes on a dark table"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEqybliwge-dJKCb96We2krcZWLTJ9-fsi9_i-JXs3RpxHCw49xsZKeA45gOiEw9gXwisH-ID0XL3hVSYLp2JikFAKWFqxVYIxyLEIm8N07wMs9DwXT241QRTgLiUXWsTRNvsMnA-69VHpRETOq00x_HQkRaNqaReUAKK7jL-WdLxbgIzf2zJwiKtylrn2LAurPDepdP6b3F26LKZuNIh-QpO92O5vUy7FK3DolpszyKNYUWdwIfDssrK4OLEy1ZAOcoU7mTy5PVlj"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center px-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-50 text-white font-semibold text-xs mb-6 uppercase tracking-wider">
              Hungry? We've got you covered.
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-xl">
              Delicious food, <br className="hidden md:block" /> delivered to your door.
            </h1>
            <p className="text-lg text-gray-200 mb-10 max-w-xl font-medium drop-shadow-md">
              From local favorites to star-rated restaurants, get the food you
              love delivered in minutes.
            </p>
            {/* Search Bar */}
            <div className="w-full bg-white dark:bg-[#1a0b0d] p-2 rounded-xl shadow-2xl flex items-center gap-2 transform transition-all hover:scale-[1.01]">
              <div className="pl-4 text-gray-400">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-400 font-medium h-12 outline-none"
                placeholder="Enter delivery address"
                type="text"
              />
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
              <div className="hidden sm:flex flex-1 items-center gap-2 px-2">
                <span className="material-symbols-outlined text-gray-400">search</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-400 font-medium h-12 outline-none"
                  placeholder="What are you craving?"
                  type="text"
                />
              </div>
              <button className="bg-primary hover:bg-red-600 text-white font-bold h-12 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer">
                Find Food
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#181112] dark:text-white">
              Explore by Category
            </h2>
            <div className="flex gap-2">
              <button className="size-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#33181c] transition-colors text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </button>
              <button className="size-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#33181c] transition-colors text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {/* Category Item: Pizza */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Fresh pizza slice"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyZySTRe3YMTgDaRfI0fhvc--1WYCdM5TNNtPEbJeecgBfaI3YS3u-aoCsVSk9MfJYaIZpHziMnXKOd3swcx4BXIrwtDLU1mZJotvuRi0aNKmKtMQQJjk3p4J3mUW0j-7ObPb55z1qM4WNskWwd_URICVy8NtO4H_ks-1ZWnVeltvMF9eyUyuY44Zof8wAnhEEAuMhfWZNTLO4MXoqxMmWhRX2xQhwmJIVkLLBgVt6EHB3dZ0DkSDU7HRmHq8ncmRnXp0PTyLL5uRn"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Pizza
              </span>
            </a>
            {/* Category Item: Burger */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Juicy beef burger"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBkdKA7ChxhbIxIHpAvFihWyNbBNLa9qeBUQgq4dYHYikFDLVAQ0TbUrenO_RJj-DcT_1Ji1iiiJFTHMnvs5B_2BY9QsHl_B0k9LjLO2AJG_23l-62LYPOkEHkVR13mnOPYkfAWM1Zr3dj6PnaQwtLdMq4ZzaLcStW6zNgpReURjYY8UFzKjXs0b2zhbz_z6_-wKj3U5t7nGvXfW2hr7i_QjSAnWN8QY7_SmhbF-LLFCit3DunB0PkOcT9ORPRyI6n-utDQrS4dTg"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Burger
              </span>
            </a>
            {/* Category Item: Sushi */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Fresh sushi rolls"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACIZKUuukRSMl-x1CEXE-n87HOQjWDCRREZZ4QegoIIavNqzpsfEwoTUl2fUEuKJpUoC8nqtdtZsDKLopYbQaBmOERm9M3QX3TgzTeuTx2EpXvGY7jpnTBAI-hEuo_MlQ8FrNOL6EKus8Ev-iDpCNzQXvItMkJA1I8EDzZz4ZtHIgAqxK7L42Z85jpYkn0tBXFjCgFtJmPJ5bROyLleUPIrpFM6elm07xwTFAzg-2KXF3SvN8UQrvosnRRLUQ_b-n9ilDnzc-FbpN2"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Sushi
              </span>
            </a>
            {/* Category Item: Asian */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Bowl of ramen"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPt3J2tEX5gQYbW7SwcR0FEwOP6-0gqbn6h44MtQq7gHIOTBuJ3CaOid-0KVxyybudJxrBDOo3kC57K7gUxuX1ZAfWTNB-sxMxn87o_rGVLzUGH5xl7h6TP1sQIOg4GZxN8FUbLyVsyYZ4YVIBuQwwrcVs3J6rhQNPG1ZaowCUEGyWkK7xn9MZigEyamCmfE_8iZf-zytEOT60DzcTG7vbRZZ9RtjJEuMvC_523WRkdZhkYqUta818v-OmHvOKkJLCbuB6mIFVJwgk"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Asian
              </span>
            </a>
            {/* Category Item: Mexican */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Tacos"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB21Ittqp89aKPzMXYXXuEKig5o5Zi0JetnND2p6b_gJKg5Zc5svmoEmIZ_9nknUk8hQnFy9Sr3CHerhLWuyJiokEDJ4caYUCvrMbs6JTzx2keHLx4BK5tsm-tQcKAmDcRKuiDJYudQel7Dv4-e30hxESQ5r-_BokYJ0idKV5NdsycwBDuDxV6_h7wwkwjEzUAMotCyImmqia4bLOXxoFBHitCdQJlhQy55LEt9tH33OhcVvviwN-eYfYgYS2kWfuOwu39OBNlYy0zn"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Mexican
              </span>
            </a>
            {/* Category Item: Healthy */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Healthy salad bowl"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb5_uX6QjW0-5D5zVMk_HJeVc12kUpi5ixAJTymEnEibcr3Q6sVx2RP1YaaGODDXswSDejX4nDdDVFod0q0a9awtvzZNHHm0jdl6P2e7FSP0ck7oLPdD944xCRyoqw8ukhV8cGL05JvPdyxbDuNN50d6pei384h8byWdELX0attfUjgSDIRBby8Ah01GSaUZ6eRBTpajJerHlfh_Dh0jLT4OCtLOUxKA2TuEwtRRlZ-FfTQqp4gy9H1od7Na_S_XY7wfbRF5445evr"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Healthy
              </span>
            </a>
            {/* Category Item: Dessert */}
            <a className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer" href="#">
              <div className="size-24 rounded-full bg-white dark:bg-[#33181c] border border-gray-100 dark:border-[#452026] shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  alt="Dessert cake"
                  className="w-16 h-16 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcJ7iXatkkBsSdEl7Bh1-dDSPcMEpa1XQ1UkJodywcufhB7acsQnmzL_EaaLTXGvxvmxnLZ2DJrs_ucFhUkDQeQMC5TxZMUjTcWV2sxNicjQRGF4Hm4iDvRdO99OmpAZGimZ0thuaJ6L68ryBHoWs3U0ulD2LrYUjYse89j7l4xiZp6fLGcgBnGt1v2DWgMNiS7by8rh9C__l9UN0WUc9lDALm7Y66vgDfaxBTlZRnT5cajjfqReZHSx1vvQpCOlgof60GPFLmA7MQ"
                />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                Dessert
              </span>
            </a>
          </div>
        </section>

        {/* Deal Banner */}
        <section className="w-full bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 text-white flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Get 30% Off Your <br />
              First Order!
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-md">
              Use code{' '}
              <span className="font-bold bg-white text-primary px-2 py-0.5 rounded border-dashed border border-primary">
                TASTY30
              </span>{' '}
              at checkout. Valid on orders over $20.
            </p>
            <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Order Now
            </button>
          </div>
          <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              alt="Healthy bowl food"
              className="rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 max-h-[300px] object-cover border-4 border-white/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfEo8tqTMcDL-GoLZ-lIU5RKvG0jcym6n_h-SwFvtFQ006Nro_58YIjmG1NeZG9OgzyNl0sZPu46i9gg4LccNSowA8mWFNtLbgmf8C7n3JRyc05fyaCaU7lv0msMTlyLVuGloJ3tg6wPBg95GQle6Hzq-pknc9RlYJGP0AHBNZ-1SJSUlWy39a-2b5Rzr1iXojsss2rdzvnReUynqtsID-Ul8H-XCK_H0GVK9hATqqFwQvtRMO6cXj3jaAQ0dGFXBwUYqt-PzyzdIt"
            />
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#181112] dark:text-white">
                Featured Restaurants
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Top rated spots in your area
              </p>
            </div>
            <a
              className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
              href="#"
            >
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Restaurant Card 1 */}
            <div className="bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Burger King interior or food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbsjewNnsEQjPp0SegWm2xUCMOwIY6-c0kzpV-oasBKcYg5E88EOQDXS3NEe4NHAmJbY_NSF8i6bLGAgv0rnfhOLkieALudBHzZ7RlwBez_iILXL-7tph4_rpbOizn9Gnus2jFGSx_5jFooSf9dGpcIQyTfr_1DsVy6DyTEUWLngbi2bMBQaoRac4zet7UsDdSPFYoQeXS2EE1SAkZeByIN2sL1-MC8BkKDasut1IUKSh26MKzSkvlhBuLnb_vlwKGHveU6vsfXikL"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-black/80 px-2 py-1 rounded text-xs font-bold text-[#181112] dark:text-white shadow-sm">
                  <span className="text-green-600">Free Delivery</span>
                </div>
                <button className="absolute top-3 right-3 size-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white truncate">
                    Burger King
                  </h3>
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    <span className="text-xs font-bold text-green-700 dark:text-green-400">
                      4.5
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-green-700 dark:text-green-400">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                  American • Burgers • Fast Food
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      schedule
                    </span>
                    <span>20-30 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      local_shipping
                    </span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Restaurant Card 2 */}
            <div className="bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Sushi restaurant food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7AMQba4t0UrWEAQ15Tx4LGBzYDTX9I3DJDL24_L54O6IWaOcYRbAvkFLm-hI3heKdgJ7e-0GtBJVBh4XLu4AOZPOjxTFIIzUhX5TGLcfIeyu6R8IsA6TpYqR1BYurgMJA4rsf9OIlizMQy6S9qiPJcmxBG02MvSA8oR28TvLw4Ik25HAX5mBne29uLOXZwHEoIkBe457yxjb1KxqqUqIhfKBtaQRae8Fcm-_Ovm5aUH33ab6fSV1QceBASl_LVuK3M77jWMP8lFH6"
                />
                <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">
                      local_fire_department
                    </span>{' '}
                    Trending
                  </span>
                </div>
                <button className="absolute top-3 right-3 size-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white truncate">
                    Sushi Master
                  </h3>
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    <span className="text-xs font-bold text-green-700 dark:text-green-400">
                      4.8
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-green-700 dark:text-green-400">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                  Japanese • Sushi • Seafood
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      schedule
                    </span>
                    <span>35-45 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      local_shipping
                    </span>
                    <span>$2.49</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Restaurant Card 3 */}
            <div className="bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Italian pizza"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaxzJxFM72u5Km_uJDBhs5qdqljpZ_NvZSiQTsJGYQxjOE8P7jTJ32uOBfbooJnmZU9k4HcTMqnEUr56oL2LFSWnsyEgUjTWAbkbZk0SCAcdkPeh6_ejTZHt-JcLWdvxiUZXcg5ltsQC1isO4RTdrP080abg3v0lrVIJ8gqBsF0Gqlw47db4ourfbCakd_J6tlGYgREw5SHBnjlo8F3lejbQsxylewi0DUoYsZ45no8MHasx1K_BQZEeGhS9WYntIikVErAxDcR_at"
                />
                <button className="absolute top-3 right-3 size-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white truncate">
                    Mama Mia Pizzeria
                  </h3>
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    <span className="text-xs font-bold text-green-700 dark:text-green-400">
                      4.3
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-green-700 dark:text-green-400">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                  Italian • Pizza • Pasta
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      schedule
                    </span>
                    <span>25-40 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      local_shipping
                    </span>
                    <span>$1.99</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Restaurant Card 4 */}
            <div className="bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="Healthy green bowls"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv9ECoQ8ARYe9m-Ob-TAe9_-IY3M96Z_1-ckfycAm4uEQoiZECFwChzlF425pr3gKAK9MWfraeXfsQiMuk9tfC82sJTqlnO4CjBsjX35Lu45hvpkAueZMxSyePMR1X1l-dC4IyvGkm4KCzqHtuZOCd8nr7iEHFmphHkrmSgfCHWd3GjpstS9q69DhpM-GH6bByH8aVG0vcVPqqDUgEflUr-oKysNRJ5kRZkQmoOa7gPyD9-LZmCXUTAY4VkLW-YaYDX__JgL_KgYO9"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-black/80 px-2 py-1 rounded text-xs font-bold text-[#181112] dark:text-white shadow-sm">
                  <span className="text-green-600">Free Delivery</span>
                </div>
                <button className="absolute top-3 right-3 size-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white truncate">
                    Green Bowl Co.
                  </h3>
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    <span className="text-xs font-bold text-green-700 dark:text-green-400">
                      4.9
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-green-700 dark:text-green-400">
                      star
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                  Healthy • Salads • Vegan
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      schedule
                    </span>
                    <span>15-25 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      local_shipping
                    </span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deals of the day Section */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#181112] dark:text-white">
                Daily Deals
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Huge discounts on your favorites
              </p>
            </div>
            <div className="flex gap-2">
              {/* Timer Pill */}
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-bold">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>Ends in 04:23:12</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal Card 1 */}
            <div className="flex bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-lg transition-all group cursor-pointer h-40">
              <div className="w-1/3 relative overflow-hidden">
                <img
                  alt="Pizza deal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhCeWoIHRyM7MEbcliyrYcR6aGddwNGd1D88XbCQLXNV8m1XL8by2YF4UXy5SgpWhgU1nWZ4sivGRF-4ctnJOOYWey91Nf9vdiOaNrVFbrNiczr7dU-BmgPFSdXETdrlhuuesiCzTXuRttnydGF0T8DvlrdM9DJz1gb0wXS-aooGmZVhsFdDANZiWElJ1GnEMqF-kBNfAy0OMBkRBwc3Dz38a6hJG-aWQAWOtTh5A6Fi3SIJRkW5FXvz1JoLE4Gp-nRMOGb--vkk5w"
                />
                <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  -50%
                </div>
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white">
                    Pepperoni Feast
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pizza Hut
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      $18.99
                    </span>
                    <span className="text-xl font-bold text-primary">$9.49</span>
                  </div>
                  <button className="bg-gray-100 dark:bg-[#452026] text-[#181112] dark:text-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Deal Card 2 */}
            <div className="flex bg-white dark:bg-[#33181c] rounded-xl overflow-hidden border border-gray-100 dark:border-[#452026] hover:shadow-lg transition-all group cursor-pointer h-40">
              <div className="w-1/3 relative overflow-hidden">
                <img
                  alt="Burger deal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBphGw_Fi_Kvpd7CNp8b6BZJ--cr34_aOZvY0ax6nfB171-hAbAcz6xCBaiGnXUa2ar0whNfbvWu1skIrGrPsTf2UfyIU5N3Wxnf-hLZhRXmtMUYkI3AltwfRWN6nKwCcCEbn1kzZGHDd7e_FobL_JhqZVaS3J9jBRe5BM2hRbD5YH5UBPRAIuus82yhrvqeWztgsKd6zzUXI9M9UGhGzHnLVbzZdSGgmHmTiRrU7ASq6qu_Xxeli2VYQrQVaWHRKXD38_EVFgE2xYk"
                />
                <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  -30%
                </div>
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#181112] dark:text-white">
                    Double Whopper
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Burger King
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      $12.99
                    </span>
                    <span className="text-xl font-bold text-primary">$8.99</span>
                  </div>
                  <button className="bg-gray-100 dark:bg-[#452026] text-[#181112] dark:text-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1a0b0d] border-t border-[#f4f0f1] dark:border-[#3a1d21] mt-12 py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    lunch_dining
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#181112] dark:text-white">
                  FoodDelivery
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                The best local restaurants delivered to your doorstep. Fresh,
                fast, and delicious.
              </p>
              <div className="flex gap-4">
                <a
                  className="text-gray-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">
                    social_leaderboard
                  </span>
                </a>
                <a
                  className="text-gray-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">public</span>
                </a>{' '}
                {/* placeholder for twitter/X */}
                <a
                  className="text-gray-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">photo_camera</span>
                </a>{' '}
                {/* placeholder for instagram */}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#181112] dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#181112] dark:text-white mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Safety Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Partner with Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#181112] dark:text-white mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2024 FoodDelivery Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}