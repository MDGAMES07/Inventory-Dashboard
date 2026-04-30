import { useState, useEffect, useMemo } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxs6vg_ZrO9S2wkCuztS8us7CLOJ55bvCOwB2UNv4Dsbxsmm_rD9Qubx_kIoI1BWoG9UQ/exec";
const ACCESS_TOKEN = "inv-dash-9f3e2a1b-8c4d-4e5f-b6a7-2d1c0e9f8b7a";

const IconBox = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const IconAlert = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconTrend = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconDollar = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconSearch = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconChevron = ({ dir = "up" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: dir === "down" ? "rotate(180deg)" : "none" }}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const IconRefresh = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// Metric Card
function MetricCard({ icon, label, value, accent }) {
  const accents = {
    blue: { bg: "#EFF6FF", border: "#BFDBFE", icon: "#2563EB" },
    red: { bg: "#FEF2F2", border: "#FECACA", icon: "#DC2626" },
    amber: { bg: "#FFFBEB", border: "#FDE68A", icon: "#D97706" },
    green: { bg: "#F0FDF4", border: "#BBF7D0", icon: "#16A34A" },
  };
  const c = accents[accent] || accents.blue;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        flex: 1,
        minWidth: 180,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: c.bg,
          border: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.icon,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: "#6B7280",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

// Sortable TH
function Th({ label, field, sortField, sortDir, onSort }) {
  const active = sortField === field;
  return (
    <th
      onClick={() => onSort(field)}
      style={{
        padding: "11px 14px",
        textAlign: "left",
        fontSize: 12,
        fontWeight: 600,
        color: active ? "#4F46E5" : "#6B7280",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        borderBottom: "2px solid #F3F4F6",
        background: "#FAFAFA",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {label}
        {active && <IconChevron dir={sortDir === "asc" ? "up" : "down"} />}
      </span>
    </th>
  );
}

// Main App
export default function App() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("priorityScore");
  const [sortDir, setSortDir] = useState("desc");
  const [filter, setFilter] = useState("all"); // all | low | ok

  // Fetch from Google Apps Script backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token: ACCESS_TOKEN }),
      });

      const json = await res.json();

      // Apps Script embeds the intended HTTP status in the JSON body
      if (json.status === 401)
        throw new Error("Unauthorized: invalid access token.");
      if (json.status >= 400)
        throw new Error(json.error || "Server error from Apps Script.");

      setProducts(json.products || []);
      setSummary(json.summary || null);
    } catch (e) {
      setError(e.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // Filter + sort
  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q || p.title.toLowerCase().includes(q) || String(p.id).includes(q);
        const matchFilter =
          filter === "all"
            ? true
            : filter === "low"
              ? p.isLowStock
              : !p.isLowStock;
        return matchSearch && matchFilter;
      })
      .sort((a, b) => {
        let av = a[sortField],
          bv = b[sortField];
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [products, search, sortField, sortDir, filter]);

  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : "—";
  const fmtUSD = (n) =>
    "$" +
    Number(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Loading state
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "3px solid #E5E7EB",
              borderTopColor: "#4F46E5",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#6B7280", fontSize: 14 }}>
            Fetching inventory data…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #FECACA",
            borderRadius: 16,
            padding: 36,
            maxWidth: 480,
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
          <h2 style={{ color: "#991B1B", margin: "0 0 8px", fontSize: 18 }}>
            Failed to load data
          </h2>
          <p style={{ color: "#6B7280", fontSize: 14, margin: "0 0 20px" }}>
            {error}
          </p>
          <button
            onClick={fetchData}
            style={{
              background: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );

  // Dashboard
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F6",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <IconBox />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Inventory Dashboard
              </h1>
              <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>
                Low Stock Inventory Tracking
              </p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 12}}>
            Built by Mohit Dharwadkar · dharwadkarmohit@gmail.com
          </p>
          <button
            onClick={fetchData}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              color: "#374151",
            }}
          >
            <IconRefresh /> Refresh
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px" }}>
        {/* Summary cards — populated from Apps Script summary object */}
        {summary && (
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <MetricCard
              icon={<IconBox />}
              label="Total Products"
              value={fmt(summary.totalProducts)}
              accent="blue"
            />
            <MetricCard
              icon={<IconAlert />}
              label="Low Stock Items"
              value={fmt(summary.lowStockProductsCount)}
              accent="red"
            />
            <MetricCard
              icon={<IconTrend />}
              label="Average Stock"
              value={fmt(summary.averageStock) + " units"}
              accent="amber"
            />
            <MetricCard
              icon={<IconDollar />}
              label="Total Inventory Value"
              value={fmtUSD(summary.totalInventoryValue)}
              accent="green"
            />
          </div>
        )}

        {/* Table card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F3F4F6",
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flexGrow: 1, maxWidth: 320 }}>
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                }}
              >
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Search by name or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: 34,
                  paddingRight: 12,
                  paddingTop: 8,
                  paddingBottom: 8,
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#111827",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                ["all", "All"],
                ["low", "Low stock"],
                ["ok", "In stock"],
              ].map(([v, lbl]) => (
                <button
                  key={v}
                  onClick={() => setFilter(v)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    background: filter === v ? "#4F46E5" : "#fff",
                    color: filter === v ? "#fff" : "#6B7280",
                    borderColor: filter === v ? "#4F46E5" : "#E5E7EB",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <span
              style={{ marginLeft: "auto", fontSize: 12, color: "#9CA3AF" }}
            >
              {filtered.length} of {summary?.totalProducts ?? products.length}{" "}
              products
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            {filtered.length === 0 ? (
              <div
                style={{ padding: 60, textAlign: "center", color: "#9CA3AF" }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                <p style={{ margin: 0, fontSize: 14 }}>
                  No products match your search.
                </p>
              </div>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr>
                    {[
                      ["id", "ID"],
                      ["title", "Product"],
                      ["stock", "Stock"],
                      ["price", "Price"],
                      ["isLowStock", "Status"],
                      ["priorityScore", "Priority Score"],
                    ].map(([field, label]) => (
                      <Th
                        key={field}
                        label={label}
                        field={field}
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const rowBg = p.isLowStock
                      ? i % 2 === 0
                        ? "#FFF5F5"
                        : "#FEF2F2"
                      : i % 2 === 0
                        ? "#fff"
                        : "#fff";
                    return (
                      <tr key={p.id} style={{ background: rowBg }}>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: "#9CA3AF",
                            fontFamily: "monospace",
                            fontSize: 12,
                          }}
                        >
                          #{p.id}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: 500,
                            color: "#111827",
                            maxWidth: 220,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.title}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                width: 52,
                                height: 6,
                                borderRadius: 3,
                                background: "#E5E7EB",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  borderRadius: 3,
                                  width: `${Math.min(100, (p.stock / 150) * 100)}%`,
                                  background: p.isLowStock ? "#EF4444" : "#10B981",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontWeight: 600,
                                color: p.isLowStock ? "#DC2626" : "#111827",
                              }}
                            >
                              {p.stock}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: 600,
                            color: "#374151",
                          }}
                        >
                          {fmtUSD(p.price)}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "0.03em",
                              background: p.isLowStock ? "#FEE2E2" : "#DCFCE7",
                              color: p.isLowStock ? "#991B1B" : "#14532D",
                            }}
                          >
                            {p.isLowStock ? "LOW STOCK" : "IN STOCK"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: 700,
                            fontFamily: "monospace",
                            color:
                              p.priorityScore > 5000
                                ? "#DC2626"
                                : p.priorityScore > 2000
                                  ? "#D97706"
                                  : "#374151",
                          }}
                        >
                          {fmt(p.priorityScore)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid #F3F4F6",
              background: "#FAFAFA",
            }}
          >
            <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>
              Low stock threshold: &lt; 20 units · Priority score = (100 −
              stock) × price · Sorted by {sortField} {sortDir}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
