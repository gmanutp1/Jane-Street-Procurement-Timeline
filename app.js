const project = {
  dueDate: "2026-07-10",
  lastUpdated: "2026-05-05",
};

// Update these fields as POs are issued so the shared site stays current.
const items = [
  {
    component: "CW COIL W/300 PSIG Construction",
    vendor: "Modine",
    plannedAmount: 65032.0,
    leadTime: "50-55 working days",
    orderWindow: "Order now",
    priority: "Buy now",
    risk: "High",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Largest buyout item. Add PO due date as soon as the release is placed.",
  },
  {
    component: "Fans (Wheels & Cones)",
    vendor: "TCF",
    plannedAmount: 14330.0,
    leadTime: "4-5 weeks",
    orderWindow: "Order now",
    priority: "Buy now",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Should move with the first purchase wave.",
  },
  {
    component: "Dampers",
    vendor: "Johnson Controls",
    plannedAmount: 2400.0,
    leadTime: "5-6 weeks",
    orderWindow: "May 8 - May 22, 2026",
    priority: "Order in May",
    risk: "Medium",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Release in May to protect the July job date.",
  },
  {
    component: "Filters",
    vendor: "Joe W. Fly",
    plannedAmount: 15413.0,
    leadTime: "3-4 weeks",
    orderWindow: "Order now",
    priority: "Buy now",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Can travel with the coil and fan release.",
  },
  {
    component: "Motors",
    vendor: "Baldor",
    plannedAmount: 11659.12,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    priority: "Order in June",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Short lead item. Hold until the June release window unless schedule changes.",
  },
  {
    component: "Transducers",
    vendor: "Dwyer",
    plannedAmount: 1295.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    priority: "Order in June",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Add actual ordered amount once the accessory PO is cut.",
  },
  {
    component: "Temp. Sensor",
    vendor: "Alps Control",
    plannedAmount: 1900.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    priority: "Order in June",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Invoice forecast will appear once a PO due date is entered.",
  },
  {
    component: "Motor Bases",
    vendor: "Texcraft",
    plannedAmount: 1050.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    priority: "Order in June",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Track with the June accessory release.",
  },
  {
    component: "Springs",
    vendor: "Qontrol",
    plannedAmount: 700.0,
    leadTime: "1-2 weeks",
    orderWindow: "Jun 5 - Jun 19, 2026",
    priority: "Order in June",
    risk: "Low",
    orderedDate: "",
    poAmount: null,
    poDueDate: "",
    note: "Add order date when the final hold items are released.",
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
    maximumFractionDigits: 2,
  }).format(value);

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value) => {
  const parsed = parseDate(value);
  if (!parsed) {
    return "Awaiting update";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const plusDays = (value, days) => {
  const parsed = parseDate(value);
  if (!parsed) {
    return "";
  }

  parsed.setDate(parsed.getDate() + days);
  return parsed.toISOString().slice(0, 10);
};

const getStatus = (item) => {
  if (item.orderedDate) {
    return { label: "Ordered", className: "badge-status-ordered" };
  }

  if (item.priority === "Buy now") {
    return { label: "Ready to place", className: "badge-status-open" };
  }

  if (item.priority === "Order in May") {
    return { label: "Scheduled for May", className: "badge-status-may" };
  }

  return { label: "Scheduled for June", className: "badge-status-june" };
};

const totalPlanned = items.reduce((sum, item) => sum + item.plannedAmount, 0);
const orderedTotal = items.reduce((sum, item) => sum + (item.poAmount || 0), 0);
const remainingTotal = totalPlanned - orderedTotal;
const orderedCount = items.filter((item) => item.orderedDate).length;
const readyNowCount = items.filter(
  (item) => !item.orderedDate && item.priority === "Buy now"
).length;
const missingPoDueDateCount = items.filter((item) => !item.poDueDate).length;

const nextInvoiceItem = items
  .filter((item) => item.poDueDate)
  .sort((left, right) => parseDate(left.poDueDate) - parseDate(right.poDueDate))[0];

document.getElementById("due-date").textContent = formatDate(project.dueDate);
document.getElementById("total-planned-value").textContent = money(totalPlanned);
document.getElementById("ordered-total").textContent = money(orderedTotal);
document.getElementById("remaining-total").textContent = money(remainingTotal);
document.getElementById("ordered-count").textContent = String(orderedCount);
document.getElementById("ready-now-count").textContent = String(readyNowCount);
document.getElementById("missing-po-dates-count").textContent = String(
  missingPoDueDateCount
);
document.getElementById("last-updated").textContent = formatDate(project.lastUpdated);
document.getElementById("next-invoice").textContent = nextInvoiceItem
  ? formatDate(nextInvoiceItem.poDueDate)
  : "Awaiting PO dates";

const majorUpdates = document.getElementById("major-updates");
const timelineBody = document.getElementById("timeline-body");

items.forEach((item) => {
  const status = getStatus(item);
  const invoiceDate = item.poDueDate ? formatDate(item.poDueDate) : "Will update from PO due date";
  const net30 = item.poDueDate ? formatDate(plusDays(item.poDueDate, 30)) : "Awaiting PO due date";
  const net45 = item.poDueDate ? formatDate(plusDays(item.poDueDate, 45)) : "Awaiting PO due date";

  const card = document.createElement("article");
  card.className = "update-card";
  card.innerHTML = `
    <div class="update-card-top">
      <div>
        <p class="update-card-vendor">${item.vendor}</p>
        <h3>${item.component}</h3>
      </div>
      <span class="badge ${status.className}">${status.label}</span>
    </div>
    <dl class="update-stat-list">
      <div>
        <dt>Planned value</dt>
        <dd>${money(item.plannedAmount)}</dd>
      </div>
      <div>
        <dt>PO amount</dt>
        <dd>${item.poAmount ? money(item.poAmount) : "Awaiting PO"}</dd>
      </div>
      <div>
        <dt>Ordered on</dt>
        <dd>${item.orderedDate ? formatDate(item.orderedDate) : "Not entered"}</dd>
      </div>
      <div>
        <dt>Expected invoice</dt>
        <dd>${invoiceDate}</dd>
      </div>
    </dl>
    <p class="update-card-note">${item.note}</p>
  `;
  majorUpdates.appendChild(card);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-label="Component">
      <div class="component-name">${item.component}</div>
      <div class="component-meta">${item.note}</div>
      <div class="badge-row">
        <span class="badge ${status.className}">${status.label}</span>
        <span class="badge ${badgeClass[item.priority] || ""}">${item.priority}</span>
        <span class="badge ${badgeClass[item.risk] || ""}">${item.risk} risk</span>
      </div>
    </td>
    <td data-label="Vendor">${item.vendor}</td>
    <td data-label="Planned Value" class="amount-cell">${money(item.plannedAmount)}</td>
    <td data-label="Lead Time">${item.leadTime}</td>
    <td data-label="Recommended Order">${item.orderWindow}</td>
    <td data-label="Ordered On">${item.orderedDate ? formatDate(item.orderedDate) : "Not entered"}</td>
    <td data-label="PO Amount">${item.poAmount ? money(item.poAmount) : "Awaiting PO"}</td>
    <td data-label="PO Due Date">${item.poDueDate ? formatDate(item.poDueDate) : "Awaiting update"}</td>
    <td data-label="Expected Invoice">${invoiceDate}</td>
    <td data-label="Net 30">${net30}</td>
    <td data-label="Net 45">${net45}</td>
  `;
  timelineBody.appendChild(row);
});

const actionBuckets = {
  Ordered: document.getElementById("bucket-ordered"),
  "Ready to place": document.getElementById("bucket-open"),
  "Scheduled for May": document.getElementById("bucket-may"),
  "Scheduled for June": document.getElementById("bucket-june"),
};

items.forEach((item) => {
  const status = getStatus(item).label;
  const target = actionBuckets[status];

  if (!target) {
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = `${item.component} (${item.vendor})`;
  target.appendChild(listItem);
});
