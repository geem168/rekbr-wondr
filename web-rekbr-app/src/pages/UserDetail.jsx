import React, { useCallback, useEffect, useState } from "react";

import { PhotoKTPSection } from "../components/UserDetail/PhotoKTPSection";
import { AccountInfoSection } from "../components/UserDetail/AccountInfoSection";
import { PersonalDataSection } from "../components/UserDetail/PersonalDataSection";
import { OtherInfoSection } from "../components/UserDetail/OtherInfoSection";
import Breadcrumb from "../components/BreadCrumb";
import { getUserById } from "../services/user.service";
import { useParams } from "react-router-dom";

export const UserDetail = () => {

  const [UserInfo, setUserInfo] = useState({});
  const { usersId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await getUserById(usersId);
      const item = res.data;

      setUserInfo({
        kycStatus: item.kycStatus,
        usersId: item.id,
        email: item.email,
        createDate: item.createdAt,
        updateDate: item.updatedAt
      });

    } catch (error) {
      console.error("Gagal ambil data user:", error);
    }
  }, [usersId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PhotoKTPSection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AccountInfoSection userInfo={UserInfo} />
          <PersonalDataSection />
          <OtherInfoSection />
        </div>
      </div>
    </div>
  );
};
