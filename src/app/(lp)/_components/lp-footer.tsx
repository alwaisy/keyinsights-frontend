// components/landing/Footer.tsx
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function LandingFooter() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center">
              <div className="mr-2 h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <h3 className="text-xl font-bold">YouTube Insights</h3>
            </div>
            <p className="mb-6 text-zinc-400">
              Transforming how we consume knowledge in the age of information
              overload. Extract what matters, save time, and learn more
              effectively.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
                  <svg
                    className="h-5 w-5 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
                  <svg
                    className="h-5 w-5 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 9H2V21H6V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
                  <svg
                    className="h-5 w-5 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2.16094C15.2508 2.16094 15.6467 2.175 16.8708 2.23125C18.0158 2.2825 18.6542 2.47969 19.0775 2.64375C19.6358 2.85938 20.0358 3.12188 20.4508 3.53594C20.8658 3.95 21.1283 4.35 21.3433 4.90781C21.5075 5.33125 21.705 5.96906 21.7562 7.11406C21.8125 8.33906 21.8267 8.735 21.8267 11.9858C21.8267 15.2367 21.8125 15.6325 21.7562 16.8567C21.705 18.0017 21.5075 18.6402 21.3433 19.0635C21.1277 19.6217 20.865 20.0217 20.4508 20.4367C20.0367 20.8517 19.6367 21.1142 19.0789 21.3292C18.6554 21.4933 18.0175 21.6908 16.8725 21.742C15.6475 21.7983 15.2517 21.8125 12.0008 21.8125C8.75 21.8125 8.35417 21.7983 7.13 21.742C5.985 21.6908 5.34667 21.4933 4.92333 21.3292C4.36552 21.1135 3.96552 20.8508 3.55052 20.4367C3.13552 20.0225 2.87302 19.6225 2.65802 19.0647C2.49395 18.6412 2.29645 18.0033 2.24521 16.8583C2.18896 15.6333 2.1749 15.2375 2.1749 11.9867C2.1749 8.73594 2.18896 8.34 2.24521 7.11594C2.29645 5.97094 2.49395 5.33313 2.65802 4.90969C2.87365 4.35156 3.13646 3.95156 3.55052 3.53656C3.96458 3.12156 4.36458 2.85906 4.92333 2.64406C5.34667 2.48 5.985 2.2825 7.13 2.23125C8.35417 2.175 8.75 2.16094 12 2.16094ZM12 0C8.69792 0 8.27083 0.0140625 7.03125 0.0703125C5.79583 0.126562 4.92333 0.332812 4.16667 0.628125C3.37917 0.9375 2.7025 1.34375 2.02792 2.02708C1.34458 2.70156 0.9375 3.37813 0.628125 4.1625C0.332812 4.91917 0.126562 5.79167 0.0703125 7.0275C0.0140625 8.26875 0 8.695 0 12C0 15.3021 0.0140625 15.7292 0.0703125 16.9688C0.126562 18.2042 0.332812 19.0767 0.628125 19.8333C0.9375 20.6208 1.34375 21.2975 2.02708 21.9721C2.70156 22.6554 3.37813 23.0625 4.1625 23.3719C4.91917 23.6672 5.79167 23.8734 7.0275 23.9297C8.26708 23.9859 8.695 24 12 24C15.3021 24 15.7292 23.9859 16.9688 23.9297C18.2042 23.8734 19.0767 23.6672 19.8333 23.3719C20.6208 23.0625 21.2975 22.6562 21.9721 21.9729C22.6554 21.2984 23.0625 20.6219 23.3719 19.8375C23.6672 19.0808 23.8734 18.2083 23.9297 16.9725C23.9859 15.7329 24 15.305 24 12.0029C24 8.70083 23.9859 8.27375 23.9297 7.03417C23.8734 5.79875 23.6672 4.92625 23.3719 4.16958C23.0625 3.37813 22.6562 2.70156 21.9729 2.02708C21.2984 1.34375 20.6219 0.936458 19.8375 0.628125C19.0808 0.332812 18.2083 0.126562 16.9725 0.0703125C15.7329 0.0140625 15.305 0 12.0029 0H12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 5.83594C8.59583 5.83594 5.83594 8.59583 5.83594 12C5.83594 15.4042 8.59583 18.1641 12 18.1641C15.4042 18.1641 18.1641 15.4042 18.1641 12C18.1641 8.59583 15.4042 5.83594 12 5.83594ZM12 16C9.79083 16 8 14.2092 8 12C8 9.79083 9.79083 8 12 8C14.2092 8 16 9.79083 16 12C16 14.2092 14.2092 16 12 16Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19.8462 5.59375C19.8462 6.38125 19.2087 7.01875 18.4212 7.01875C17.6337 7.01875 16.9961 6.38125 16.9961 5.59375C16.9961 4.80625 17.6337 4.16875 18.4212 4.16875C19.2087 4.16875 19.8462 4.80625 19.8462 5.59375Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-purple-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-purple-400"
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-purple-400"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-purple-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-purple-400"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>
            <p className="mb-4 text-zinc-400">
              Get notified about new features and updates.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="border-zinc-800 bg-zinc-900/80 text-white"
              />
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Subscribe
              </Button>
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-zinc-900 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-zinc-600 md:mb-0">
            © 2025 YouTube Insights. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-zinc-600 hover:text-purple-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-zinc-600 hover:text-purple-400">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-zinc-600 hover:text-purple-400">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
