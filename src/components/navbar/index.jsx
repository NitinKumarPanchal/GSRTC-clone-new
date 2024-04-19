import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import avatar from "assets/img/avatars/avatar4.png";
import gsrtc from "assets/img/logos/gsrtclogo2.png";
import { isMobile } from "react-device-detect";

const Navbar = (props) => {
  const { onOpenSidenav } = props;

  return (
    <nav
      className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2"
      style={{
        backgroundColor: "rgb(51, 122, 183)",
        height: "70px",
        marginBottom: "15px",
      }}
    >
      <div className="ml-[6px]">
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <img
            className="h-10 w-10 rounded-full"
            src={gsrtc}
            style={{ width: "120px" }}
            alt=""
          />
        </p>
      </div>
      <span
        className="ml-[90px] flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
        onClick={onOpenSidenav}
      >
        <FiAlignJustify className="h-5 w-5" />
      </span>
      <div style={{ display: "flex" }}>
        {!isMobile ? (
          <>
            <a href="/auth/sign-in" className="navItem">GSRTC Login</a>
            <a href=" " className="navItem">Track Bus</a>
            <a href=" " className="navItem">Bus Pass Login</a>
            <a href=" " className="navItem">1800 233 666666</a>
            <a href="https://nitin-panchal-portfolio.vercel.app/" className="navItem">About</a>
          </>
        ) : null}

        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full mr-5 border-2 border-white"
              src={avatar}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Hey, Nitin
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <a
                  href="/admin/profile"
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <a
                  href="/auth/sign-in "
                  className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
