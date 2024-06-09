"use client";

import { config } from "@/lib/config";
import { IonIcon } from "@ionic/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link'

export function Footer() {
  return (
    <>
      <section className="border-t mb-0 h-48 z-20">
        <div className="max-w-screen-xl px-4 pt-12 pb-0 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8" id="footer">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            {config.links.map((b, index) => (
                  <Link className="px-5 py-2 cursor-pointer rere" href={b.href} key={index}>
                    {b.name}
                  </Link>
            ))}
          </nav>
          <div className="flex justify-center mt-8 space-x-6">
            {config.socials.map((soc, index) => {
              return (
                <Link target="_blank" href={soc.href} key={index} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{soc.name}</span>
                <IonIcon icon={soc.icon} className="dark:text-white text-black" style={{ fontSize: "24px  "}}/>
              </Link>
              );
            })}
          </div>
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2024 {config.title}. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}
