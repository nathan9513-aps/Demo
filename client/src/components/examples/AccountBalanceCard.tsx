import AccountBalanceCard from "../AccountBalanceCard";

export default function AccountBalanceCardExample() {
  return (
    <AccountBalanceCard
      balance={4500.00}
      accountNumber="CH12 **** **** 5678"
      availableBalance={4500.00}
      pendingAmount={0}
    />
  );
}
