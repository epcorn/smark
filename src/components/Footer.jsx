
import { home_page } from "../data/home_page_Data";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  const { footer, contact, email } = home_page || {};

  return (
    <footer className="relative overflow-hidden bg-[#102A43] text-white">
      {/* Brand accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#3DCED4] via-[#81D959] to-[#3DCED4]" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          {/* Brand and copyright */}
          <div className="max-w-xl">
            <a
              href="/"
              className="inline-flex items-center text-xl font-extrabold tracking-wide"
            >
              <span className="text-[#3DCED4]">S</span>
              <span>MARK</span>
              <span className="h-2 w-2 rounded-full bg-[#81D959]" />
            </a>

            {footer && (
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {footer}
              </p>
            )}
          </div>

          {/* Contact details */}
          {(contact || email) && (
            <address className="flex flex-col items-center gap-3 not-italic sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
              {contact && (
                <a
                  href={`tel:${String(contact).replace(/[^\d+]/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#3DCED4]/60 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3DCED4]/15 text-[#3DCED4] transition group-hover:bg-[#3DCED4] group-hover:text-[#102A43]">
                    <FaPhoneAlt size={15} />
                  </span>

                  <span className="text-left">
                    <span className="block text-xs text-slate-400">
                      Call us
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {contact}
                    </span>
                  </span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#81D959]/60 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#81D959]/15 text-[#81D959] transition group-hover:bg-[#81D959] group-hover:text-[#102A43]">
                    <FaEnvelope size={15} />
                  </span>

                  <span className="text-left">
                    <span className="block text-xs text-slate-400">
                      Email us
                    </span>
                    <span className="break-all text-sm font-semibold text-white">
                      {email}
                    </span>
                  </span>
                </a>
              )}
            </address>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-7 border-t border-white/10 pt-5 text-center">
          <p className="text-xs leading-5 text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#3DCED4]">SMARK</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
