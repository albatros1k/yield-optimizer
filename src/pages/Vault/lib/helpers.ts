interface IChartArea {
  bottom: number;
  top: number;
}

export const createGradient = (ctx: CanvasRenderingContext2D, area: IChartArea, color: string) => {
  const colorStart = color + '00';
  const colorMid = color + '24';
  const colorEnd = color + '48';

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
};
