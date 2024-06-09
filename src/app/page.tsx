"use client";

import { FC, useEffect, useRef } from "react";
import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "popIn"
  | "shiftInUp"
  | "rollIn"
  | "whipIn"
  | "whipInUp"
  | "calmInUp";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
}

const animationVariants = {
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.3 },
      }),
    },
    child: {
      visible: {
        opacity: 1,
        y: [0, -10, 0],
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: { opacity: 0, y: 10 },
    },
  },
  fadeInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    child: {
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
      hidden: { opacity: 0, y: 20 },
    },
  },
  popIn: {
    container: {
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
      },
    },
    child: {
      visible: {
        opacity: 1,
        scale: 1.1,
        transition: { type: "spring", damping: 15, stiffness: 400 },
      },
      hidden: { opacity: 0, scale: 0 },
    },
  },
  calmInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.125, 0.92, 0.69, 0.975],
          duration: 0.75,
        },
      },
    },
  },
  shiftInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "100%",
        transition: {
          ease: [0.75, 0, 0.25, 1],
          duration: 0.6,
        },
      },
      visible: {
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  },
  whipInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05],
          duration: 0.75,
        },
      },
    },
  },
  rollIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.65,
          ease: [0.65, 0, 0.75, 1],
        },
      },
    },
  },
  whipIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,
          ease: [0.85, 0.1, 0.9, 1.2],
        },
      },
    },
  },
};

const TextAnimate: FC<Props> = ({
  text,
  type = "whipInUp",
  ...props
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const letters = Array.from(text);
  const { container, child } = animationVariants[type];

  const ctrls = useAnimation();

  if (type === "rollIn" || type === "whipIn") {
    return (
      <h2 className="mt-10 text-3xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl">
        {text.split(" ").map((word, index) => {
          return (
            <motion.span
              ref={ref}
              className="inline-block mr-[0.25em] whitespace-nowrap"
              aria-hidden="true"
              key={index}
              initial="hidden"
              animate="visible"
              variants={container}
              transition={{
                delayChildren: index * 0.13,
                staggerChildren: 0.025,
              }}
            >
              {word.split("").map((character, index) => {
                return (
                  <motion.span
                    aria-hidden="true"
                    key={index}
                    variants={child}
                    className="inline-block -mr-[0.01em]"
                  >
                    {character}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
      </h2>
    );
  }

  return (
    <motion.h2
      style={{ display: "flex", overflow: "visible" }} // Adjusted overflow
      role="heading"
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-10 text-4xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl"
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};



const AnimationDemo = ({ type, children }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col relative" ref={ref}>
      <div className="mt-8">
        <TextAnimate text={children} duration={0.5} type={type}></TextAnimate>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <center className="center">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-center  sm:text-6xl">
                <AnimationDemo type="fadeIn">
                  Hey, I&#39;m Lwh. a software developer
                </AnimationDemo>
              </h1>
              <p className="mt-6 text-lg leading-8 ">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/contact"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Contact me
                </a>
                <a
                  href="/about"
                  className="text-sm font-semibold leading-6"
                  id="hov"
                >
                  About me{" "}
                  <span aria-hidden="true" className="" id="as">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}
