# Pharmacy Dashboard Prototype Features & Guide

## 1. Credentials
- **Role**: Pharmacist / Operations
- **Password**: `GetNow_Anduin@2026`

## 2. Order Processing "Happy Path"
This flow describes the standard lifecycle of an order in the system:

1.  **Order Placement**
    -   Customer places order.
    -   Status: `New`.
    -   If standard meds: Auto-moves to `Waiting for Payment`.
    -   If prescription meds: Auto-moves to `Review needed`.

2.  **Pharmacist Review** (if Prescription)
    -   Pharmacist consults customer and checks inventory.
    -   Action: `Verify`.
    -   Status transitions to: `Waiting for Payment`.

3.  **Payment Processing**
    -   System awaits payment confirmation.
    -   Condition: Payment received (Simulated via "Total" Cheat).
    -   Status transitions to: `Packing`.
    -   Action: `Print label`.

4.  **Packing & Fulfillment**
    -   Staff packs items.
    -   Action: `Confirm Packed`.
    -   Status transitions to: `Ready to Ship`.
    -   System begins searching for a driver.

5.  **Driver Assignment**
    -   Driver accepts the order (Simulated via "Prescription" Cheat).
    -   Status transitions to: `Driver Picking Up` / `Driver Assigned`.

6.  **Delivery**
    -   Driver picks up package.
    -   Status transitions to: `Out for Delivery`.
    -   Driver delivers to customer (Simulated via "Non-Prescription" Cheat).
    -   Status transitions to: `Completed`.

## 3. Demo Cheat Triggers
To facilitate smooth demos without waiting for backend events or driver apps, use these "Cheat Codes" by **clicking 3 times** on the Stats Cards at the top of the Orders Management page.

| Card | Trigger | Effect | Transition |
| :--- | :--- | :--- | :--- |
| **Total** | Click 3x | Simulate **Payment Received** | `Waiting for Payment` -> `Packing` |
| **Prescription** | Click 3x | Simulate **Driver Pickup** | `Ready to Ship` -> `Driver Assigned` |
| **Non-Prescription** | Click 3x | Simulate **Order Handover** | `Out for Delivery` -> `Completed` |

*Note: Clicking a cheat trigger will show a notification confirming the action.*

## 4. Key UI Features

### Orders Management Page
-   **Smart Grouping**: Orders are categorized into `Needs action`, `Queue`, `In transit`, and `Past Orders`.
-   **Tabs**: Filter view by stage (`All`, `Queue`, `In transit`, `Past Orders`).
-   **Create Order**: Pharmacists can manually create orders via the primary action button.
-   **Search & Filter**: Search by order ID or customer; filter by date range (default: "Last 7 days").

### Order Details Page
-   **Unfrozen Banners**: Status banners scroll with the content to maximize screen real estate.
-   **Sticky Footer**: Action buttons remain accessible at the bottom of the screen.
-   **Comprehensive Layouts**: Dedicated layouts for each state (`ReadyToPack`, `DriverAssigned`, `OutForDelivery`, `Completed`, etc.).
