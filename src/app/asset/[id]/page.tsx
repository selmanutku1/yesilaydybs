import AssetDetail from '@/components/features/qr/AssetDetail';

export default function QRAssetPage({ params }: { params: { id: string } }) {
  return <AssetDetail id={params.id} />;
}
