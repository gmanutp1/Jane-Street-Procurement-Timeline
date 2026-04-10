const items = [
  {
    component: "CW COIL W/300 PSIG Construction",
    vendor: "Modine",
    amount: 65032.0,
    leadTime: "50-55 working days",
    orderWindow: "Order now",
    shipInvoice: "Requested ship: Jun 19, 2026",
    net30: "Jul 19, 2026",
    net45: "Aug 3, 2026",
    priority: "Buy now",
    risk: "High",
  },
  {
    component: "Fans (Wheels & Cones)",
    vendor: "TCF",
    amount: 14330.0,
    leadTime: "4-5 weeks",
    orderWindow: "Order now",
    shipInvoice: "Requested ship: Jun 19, 2026",
    net30: "Jul 19, 2026",
    net45: "Aug 3, 2026",
    priority: "Buy now",
    risk: "Low",
  },
  {
    component: "Dampers",
    vendor: "Johnson Controls",
    amount: 2400.0,
    leadTime: "5-6 weeks",
    orderWindow: "May 8 - May 22, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in May",
    risk: "Medium",
  },
  {
    component: "Filters",
    vendor: "Joe W. Fly",
    amount: 15413.0,
    leadTime: "3-4 weeks",
    orderWindow: "Order now",
    shipInvoice: "Requested ship: Jun 19, 2026",
    net30: "Jul 19, 2026",
    net45: "Aug 3, 2026",
    priority: "Buy now",
    risk: "Low",
  },
  {
    component: "Motors",
    vendor: "Baldor",
    amount: 11659.12,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in June",
    risk: "Low",
  },
  {
    component: "Transducers",
    vendor: "Dwyer",
    amount: 1295.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in June",
    risk: "Low",
  },
  {
    component: "Temp. Sensor",
    vendor: "Alps Control",
    amount: 1900.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in June",
    risk: "Low",
  },
  {
    component: "Motor Bases",
    vendor: "Texcraft",
    amount: 1050.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in June",
    risk: "Low",
  },
  {
    component: "Springs",
    vendor: "Qontrol",
    amount: 700.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    shipInvoice: "Jun 12 - Jul 3, 2026",
    net30: "Jul 12 - Aug 2, 2026",
    net45: "Jul 27 - Aug 17, 2026",
    priority: "Order in June",
    risk: "Low",
  },
];

const badgeClass = {
  "Buy now": "badge-buy-now",
  "Order first": "badge-order-first",
  "Order in May": "badge-order-may",
  "Order in June": "badge-order-june",
  High: "badge-risk-high",
  Medium: "badge-risk-medium",
  Low: "badge-risk-low",
};

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const total = items.reduce((sum, item) => sum + item.amount, 0);
const highRiskTotal = items
  .filter((item) => item.risk === "High")
  .reduce((sum, item) => sum + item.amount, 0);
const buyNowCount = items.filter((item) => item.priority === "Buy now").length;

document.getElementById("total-value").textContent = money(total);
document.getElementById("high-risk-total").textContent = money(highRiskTotal);
document.getElementById("buy-now-count").textContent = String(buyNowCount);

const timelineBody = document.getElementById("timeline-body");

items.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-label="Component">
      <div class="component-name">${item.component}</div>
      <div class="badge-row">
        <span class="badge ${badgeClass[item.priority] || ""}">${item.priority}</span>
        <span class="badge ${badgeClass[item.risk] || ""}">${item.risk} risk</span>
      </div>
    </td>
    <td data-label="Vendor">${item.vendor}</td>
    <td data-label="Amount" class="amount-cell">${money(item.amount)}</td>
    <td data-label="Lead Time">${item.leadTime}</td>
    <td data-label="Recommended Order">${item.orderWindow}</td>
    <td data-label="Expected Ship / Invoice">${item.shipInvoice}</td>
    <td data-label="Net 30">${item.net30}</td>
    <td data-label="Net 45">${item.net45}</td>
  `;
  timelineBody.appendChild(row);
});

const releaseTargets = {
  "Buy now": document.getElementById("release-now"),
  "Order in May": document.getElementById("release-may"),
  "Order in June": document.getElementById("release-june"),
};

Object.entries(releaseTargets).forEach(([priority, element]) => {
  items
    .filter((item) => item.priority === priority)
    .forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.component} (${item.vendor})`;
      element.appendChild(listItem);
    });
});
