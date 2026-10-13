import React from "react";
import { Metadata } from "next";
import { GodScreen } from "@/components/GodScreen";
import { getGodById, GODS_DATA } from "@/lib/gods";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return GODS_DATA.map((god) => ({
    id: god.id.toString(),
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const god = getGodById(params.id);
  return {
    title: `${god.name} (${god.tamilName}) — Navarathri Tales`,
    description: god.englishDesc,
    openGraph: {
      title: `${god.name} — Navarathri Tales`,
      description: god.englishDesc,
      images: [god.imageUrl],
    },
  };
}

export default function DeityPage({ params }: PageProps) {
  const parsedId = parseInt(params.id, 10);
  const validId = isNaN(parsedId) || parsedId < 1 || parsedId > 8 ? 1 : parsedId;

  return <GodScreen id={validId} />;
}
