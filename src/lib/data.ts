export type CaseStatus = "Active" | "Pending" | "Discovery" | "Trial" | "Closed";

export interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  status: CaseStatus;
  court: string;
  nextHearing: string;
  value: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeCases: number;
  billed: number;
}

export interface Hearing {
  id: string;
  caseTitle: string;
  date: string;
  time: string;
  court: string;
  judge: string;
  purpose: string;
}

export interface Doc {
  id: string;
  name: string;
  caseTitle: string;
  kind: string;
  updated: string;
  size: string;
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  issued: string;
  due: string;
  status: "Paid" | "Outstanding" | "Overdue";
}

export const cases: Case[] = [
  { id: "C-1042", title: "Meridian Holdings v. Alto Corp", client: "Meridian Holdings", type: "Commercial Litigation", status: "Trial", court: "High Court, Calcutta", nextHearing: "Oct 7, 2026", value: 4200000 },
  { id: "C-1038", title: "Estate of R. Chatterjee", client: "Chatterjee Family", type: "Probate & Estate", status: "Discovery", court: "District Court, Alipore", nextHearing: "Oct 12, 2026", value: 1850000 },
  { id: "C-1035", title: "Nandi Infra Contract Dispute", client: "Nandi Infrastructure", type: "Arbitration", status: "Active", court: "ICA Tribunal, New Delhi", nextHearing: "Oct 20, 2026", value: 6700000 },
  { id: "C-1031", title: "State v. A. Verma", client: "Aditya Verma", type: "Criminal Defence", status: "Pending", court: "Sessions Court, Calcutta", nextHearing: "Nov 3, 2026", value: 350000 },
  { id: "C-1027", title: "BlueRiver IP Licensing", client: "BlueRiver Labs", type: "Intellectual Property", status: "Active", court: "IPD, Delhi High Court", nextHearing: "Nov 14, 2026", value: 2400000 },
  { id: "C-1019", title: "Ghosh Property Partition", client: "S. Ghosh", type: "Real Estate", status: "Closed", court: "Civil Court, Howrah", nextHearing: "—", value: 980000 },
];

export const clients: Client[] = [
  { id: "CL-01", name: "Rohan Mehta", company: "Meridian Holdings", email: "rohan@meridian.in", phone: "+91 98300 11223", activeCases: 1, billed: 1240000 },
  { id: "CL-02", name: "Priya Chatterjee", company: "Chatterjee Family", email: "priya.c@gmail.com", phone: "+91 90071 44556", activeCases: 1, billed: 310000 },
  { id: "CL-03", name: "Arjun Nandi", company: "Nandi Infrastructure", email: "arjun@nandiinfra.com", phone: "+91 98110 77889", activeCases: 1, billed: 1980000 },
  { id: "CL-04", name: "Aditya Verma", company: "—", email: "a.verma@outlook.com", phone: "+91 98361 22004", activeCases: 1, billed: 175000 },
  { id: "CL-05", name: "Sara Iqbal", company: "BlueRiver Labs", email: "sara@blueriver.io", phone: "+91 99200 33117", activeCases: 1, billed: 860000 },
];

export const hearings: Hearing[] = [
  { id: "H-01", caseTitle: "Meridian Holdings v. Alto Corp", date: "Oct 7, 2026", time: "10:30 AM", court: "High Court, Calcutta — Court 12", judge: "Hon. Justice S. Banerjee", purpose: "Final arguments" },
  { id: "H-02", caseTitle: "Estate of R. Chatterjee", date: "Oct 12, 2026", time: "11:00 AM", court: "District Court, Alipore — Court 4", judge: "Hon. Judge M. Roy", purpose: "Evidence hearing" },
  { id: "H-03", caseTitle: "Nandi Infra Contract Dispute", date: "Oct 20, 2026", time: "2:00 PM", court: "ICA Tribunal, New Delhi", judge: "Arbitrator K. Menon", purpose: "Cross-examination of witnesses" },
  { id: "H-04", caseTitle: "State v. A. Verma", date: "Nov 3, 2026", time: "10:00 AM", court: "Sessions Court, Calcutta — Court 2", judge: "Hon. Judge D. Sen", purpose: "Bail application" },
];

export const documents: Doc[] = [
  { id: "D-01", name: "Written Statement — Meridian v. Alto", caseTitle: "Meridian Holdings v. Alto Corp", kind: "Pleading", updated: "Sep 28, 2026", size: "1.2 MB" },
  { id: "D-02", name: "Will & Codicil — R. Chatterjee", caseTitle: "Estate of R. Chatterjee", kind: "Evidence", updated: "Sep 25, 2026", size: "840 KB" },
  { id: "D-03", name: "Arbitration Claim Statement", caseTitle: "Nandi Infra Contract Dispute", kind: "Pleading", updated: "Sep 21, 2026", size: "2.4 MB" },
  { id: "D-04", name: "Bail Application Draft v3", caseTitle: "State v. A. Verma", kind: "Draft", updated: "Sep 30, 2026", size: "310 KB" },
  { id: "D-05", name: "Licence Agreement — BlueRiver", caseTitle: "BlueRiver IP Licensing", kind: "Contract", updated: "Sep 18, 2026", size: "1.7 MB" },
  { id: "D-06", name: "Partition Deed (Executed)", caseTitle: "Ghosh Property Partition", kind: "Deed", updated: "Aug 30, 2026", size: "960 KB" },
];

export const invoices: Invoice[] = [
  { id: "INV-2091", client: "Meridian Holdings", amount: 420000, issued: "Sep 1, 2026", due: "Oct 1, 2026", status: "Overdue" },
  { id: "INV-2094", client: "Nandi Infrastructure", amount: 610000, issued: "Sep 15, 2026", due: "Oct 15, 2026", status: "Outstanding" },
  { id: "INV-2095", client: "BlueRiver Labs", amount: 260000, issued: "Sep 20, 2026", due: "Oct 20, 2026", status: "Outstanding" },
  { id: "INV-2088", client: "Chatterjee Family", amount: 95000, issued: "Aug 10, 2026", due: "Sep 10, 2026", status: "Paid" },
  { id: "INV-2085", client: "Aditya Verma", amount: 75000, issued: "Aug 2, 2026", due: "Sep 2, 2026", status: "Paid" },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
