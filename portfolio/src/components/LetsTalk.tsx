"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAnimate } from "motion/react";
import { Mail } from "lucide-react";

import { Button, buttonVariants } from "./ui/button";
import { HighlighterItem, HighlightGroup, Particles } from "./ui/highlighter";

export function LetsTalk() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#javascript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 50, top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#javascript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#react-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 224, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#react-js", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#typescript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 88, top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#typescript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#next-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#next-js", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  return (
    <section className="relative mx-auto mb-20 mt-6 max-w-6xl" id="contact">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
        >
          <HighlighterItem className="rounded-[2.5rem] p-6 md:p-10">
            <div className="relative z-20 h-full overflow-hidden rounded-[2.25rem] border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#ffffff"}
                vy={-0.2}
              />
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center items-center gap-10 p-6 md:h-[460px] md:flex-row">
                  <div
                    className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px] md:scale-110"
                    ref={scope}
                  >
                    <div
                      id="next-js"
                      className="absolute bottom-12 left-14 rounded-3xl border border-white/20 bg-neutral-800/80 px-2 py-1.5 text-xs text-white opacity-50 backdrop-blur-md"
                    >
                      Web Application
                    </div>
                    <div
                      id="react-js"
                      className="absolute left-2 top-20 rounded-3xl border border-white/20 bg-neutral-800/80 px-2 py-1.5 text-xs text-white opacity-50 backdrop-blur-md"
                    >
                      AI Integration
                    </div>
                    <div
                      id="typescript"
                      className="absolute bottom-20 right-1 rounded-3xl border border-white/20 bg-neutral-800/80 px-2 py-1.5 text-xs text-white opacity-50 backdrop-blur-md whitespace-nowrap"
                    >
                      Branding & Marketing
                    </div>
                    <div
                      id="javascript"
                      className="absolute right-12 top-10 rounded-3xl border border-white/20 bg-neutral-800/80 px-2 py-1.5 text-xs text-white opacity-50 backdrop-blur-md"
                    >
                      UI/UX
                    </div>

                    <div id="pointer" className="absolute z-50">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-white"
                        stroke="black"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white bg-blue-600 shadow-md">
                        Let's Talk
                      </span>
                    </div>
                  </div>

                  <div className="-mt-16 flex h-full flex-col justify-center p-4 md:-mt-0 md:ml-16 md:w-[500px]">
                    <div className="flex flex-col items-start">
                      <h3 className="mt-6 pb-2 font-medium text-white">
                        <span className="text-3xl md:text-5xl lg:text-[56px] tracking-tight leading-tight">
                          Ready to elevate your product's user experience?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-10 mt-4 text-white/60 text-lg md:text-xl font-light max-w-lg">
                      Whether you're scaling an enterprise platform or launching a 0-to-1 AI startup, let's talk about how design can drive your outcomes.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="mailto:Anandhvishwa12@gmail.com">
                        <Button className="rounded-full">Start a conversation</Button>
                      </a>
                      <a
                        href="mailto:Anandhvishwa12@gmail.com"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                          "rounded-full"
                        )}
                      >
                        <span className="flex items-center justify-center h-full w-full">
                          <Mail strokeWidth={1.5} className="h-5 w-5" />
                        </span>
                      </a>
                      <a
                        href="https://wa.me/9150281870"
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                          "rounded-full"
                        )}
                      >
                        <span className="flex items-center justify-center h-full w-full">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}
