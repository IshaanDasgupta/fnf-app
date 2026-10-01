import React from "react";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";

interface ListingCostBreakdownProps {
  rent: number;
  deposit?: number;
  brokerage?: number;
  setupCost?: number;
  moveInCharges?: number;
}

interface CostRowProps {
  label: string;
  amount: number;
  emphasized?: boolean;
}

function formatAmount(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

function CostRow({ label, amount }: CostRowProps) {
  return (
    <ThemedView style={styles.row}>
      <ThemedText variant="bodySmall" color="foreground.secondary">
        {label}
      </ThemedText>

      <ThemedText variant="thinTitle" color="foreground.primary">
        {formatAmount(amount)}
      </ThemedText>
    </ThemedView>
  );
}

export default function ListingCostBreakdown({
  rent,
  deposit,
  brokerage,
  setupCost,
  moveInCharges,
}: ListingCostBreakdownProps) {
  return (
    <ThemedView>
      <ThemedText variant="h2">Cost Breakdown</ThemedText>

      <Spacer size="lg" />

      <ThemedView gap="md">
        <ThemedView variant="tertiary" style={{ width: "100%", height: 2 }} />
        <CostRow label="Monthly Rent" amount={rent} />
        <ThemedView variant="tertiary" style={{ width: "100%", height: 2 }} />

        {deposit !== undefined && (
          <>
            <CostRow label="Security Deposit" amount={deposit} />
            <ThemedView
              variant="tertiary"
              style={{ width: "100%", height: 2 }}
            />
          </>
        )}
        {brokerage !== undefined && (
          <>
            <CostRow label="Brokerage" amount={brokerage} />
            <ThemedView
              variant="tertiary"
              style={{ width: "100%", height: 2 }}
            />
          </>
        )}
        {setupCost !== undefined && (
          <>
            <CostRow label="Setup Cost" amount={setupCost} />
            <ThemedView
              variant="tertiary"
              style={{ width: "100%", height: 2 }}
            />
          </>
        )}
        {moveInCharges !== undefined && (
          <>
            <CostRow label="Move-in Charges" amount={moveInCharges} />
            <ThemedView
              variant="tertiary"
              style={{ width: "100%", height: 2 }}
            />
          </>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = {
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },

  divider: {
    height: 1,
    width: "100%",
    marginVertical: sizes.xs,
  },

  totalAmount: {
    fontWeight: "700" as const,
  },
};
