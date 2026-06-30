import { useLocation, Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({id}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isUUID = (str) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  // Mapping segment ke nama item
  const routeNameMap = {
    transactions: "Daftar Transaksi",
    users: "Daftar User",
    complain: "Daftar Komplain",
    "barang-hilang": "Komplain Barang Hilang",
    "barang-rusak": "Komplain Barang Rusak",
    "barang-ga-sesuai": "Komplain Barang Ga Sesuai",
  };

  // Mapping segment ke menu group
  const parentMenuMap = {
    transactions: "Manajemen Rekber",
    users: "Manajemen Pengguna",
    complain: "Manajemen Komplain",
    "barang-hilang": "Komplain Center",
    "barang-rusak": "Komplain Center",
    "barang-ga-sesuai": "Komplain Center",
  };

  // Mapping untuk detail pages
  const detailNameMap = {
    "barang-hilang": "Komplain Barang Hilang",
    "barang-rusak": "Komplain Barang Rusak",
    "barang-ga-sesuai": "Komplain Barang Ga Sesuai",
  };

  // Cari parent menu dari segment pertama
  const firstSegment = pathnames[0];
  const parentMenu = parentMenuMap[firstSegment];

  return (
    <div className="w-full flex flex-row items-center gap-2 text-left text-base text-dimgray font-sf-pro mb-4">
      {parentMenu && (
        <div className="flex items-center gap-2">
          <span className="leading-6 text-[#5c5c5c]">{parentMenu}</span>
        </div>
      )}

      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        let displayName;

        if (isUUID(name)) {
          // Handle detail pages
          if (firstSegment === "transactions") {
            displayName = "Detail Transaksi";
          } else if (firstSegment === "users") {
            displayName = "Detail User";
          } else if (firstSegment === "complain") {
            displayName = "Detail Komplain";
          } else if (id) {
            displayName = id;
          } else {
            displayName = "Detail";
          }
        } else {
          // Handle regular routes
          displayName = routeNameMap[name] ||
            name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
        }

        // Special handling for detail pages with specific names
        if (isLast && detailNameMap[name]) {
          displayName = detailNameMap[name];
        }

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-[#5c5c5c]" />
            {isLast ? (
              <span className="leading-6 font-semibold text-[#0250d9]">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="leading-6 text-[#5c5c5c] hover:underline"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
