import SoilMoisture from "./soil/soilMoistureChart";
import TaskComponent from "./task/taskComponent";
import ForecastWeather from "./weather/forecastWeatherChart";
import WeatherOverview from "./weather/fullWeatherOverview";

export default function MainComponent() {
  return (
    <>
      <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-4 grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 gap-4">
        <WeatherOverview />
        <ForecastWeather />
      </div>

      <div className="lg:col-start-2 col-span-1 lg:row-start-1 lg:row-span-5">
        <TaskComponent />
      </div>

      <div className="lg:col-start-1 col-span-1 lg:row-start-5 lg:row-span-5 overflow-hidden">
        <div className="h-full min-h-0 overflow-y-auto bg-dark-surface rounded-2xl p-3 shadow-xl">
          <div className="text-sm text-gray-400 mb-2">Section 3</div>
          <div className="space-y-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="p-3 rounded-xl bg-dark-light">
                Row {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-start-2 col-span-1 lg:row-start-6 lg:row-span-4 overflow-hidden">
        <SoilMoisture />
      </div>
    </>
  );
}
