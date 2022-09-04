import * as React from "react";

export type ForecastTempProps = {
  temperature: number;
};

export function ForecastTemp({ temperature }: ForecastTempProps) {
  return <span className="c-fc-temp">{Math.round(temperature)}°</span>;
}
