// ========== Temperature Alerts ================================================================================================
// ==============================================================================================================================
export const generateWeatherAlerts = ({ current, forecast }) => {
  const alerts = [];

  if (current?.temp_c >= 45) {
    alerts.push({
      type: 'extreme_heat',
      severity: 'very_high',
      title: 'Extreme Heat Emergency',
      description: `Dangerous heat conditions with temperature reaching ${current.temp_c}°C. Heat stroke is likely. Avoid all physical activity outdoors and stay hydrated.`,
      icon: 'Sun'
    });
  } else if (current?.temp_c >= 40) {
    alerts.push({
      type: 'heat_warning',
      severity: 'high',
      title: 'Severe Heat Warning',
      description: `Temperature is around ${current.temp_c}°C. Risk of heat exhaustion and cramps. Drink water frequently, wear light clothes, and avoid the sun from 12 PM to 4 PM.`,
      icon: 'Thermometer'
    });
  } else if (current?.temp_c >= 35) {
    alerts.push({
      type: 'heat_advisory',
      severity: 'moderate',
      title: 'Heat Advisory',
      description: `Temperature around ${current.temp_c}°C. Consider staying indoors during the afternoon. Use fans or cooling devices.`,
      icon: 'Thermometer'
    });
  } else if (current?.temp_c <= 0) {
    alerts.push({
      type: 'freeze_warning',
      severity: 'high',
      title: 'Freezing Temperature Alert',
      description: `Current temperature is ${current.temp_c}°C. Risk of frostbite and freezing pipes. Keep pets inside and cover exposed skin.`,
      icon: 'Snowflake'
    });
  } else if (current?.temp_c < 5) {
    alerts.push({
      type: 'cold_advisory',
      severity: 'moderate',
      title: 'Cold Weather Advisory',
      description: `Low temperature of ${current.temp_c}°C. Dress in layers and avoid prolonged exposure to cold air.`,
      icon: 'Snowflake'
    });
  }

  // ========== UV Index Alerts ==========
  if (current?.uv >= 11) {
    alerts.push({
      type: 'uv_extreme',
      severity: 'very_high',
      title: 'Extreme UV Index',
      description: `UV index is ${current.uv}. Sunburn can occur in minutes. Wear SPF 50+, long sleeves, and avoid sunlight.`,
      icon: 'Sun'
    });
  } else if (current?.uv >= 8) {
    alerts.push({
      type: 'uv_high',
      severity: 'high',
      title: 'Very High UV Index',
      description: `UV index is ${current.uv}. Skin damage possible without protection. Wear sunglasses and SPF 30+.`,
      icon: 'Sun'
    });
  } else if (current?.uv >= 6) {
    alerts.push({
      type: 'uv_moderate',
      severity: 'moderate',
      title: 'Moderate UV Index',
      description: `UV index is ${current.uv}. Protective measures recommended if staying outside for long periods.`,
      icon: 'Sun'
    });
  }

  // ========== Wind Alerts ==========
  if (current?.wind_kph >= 70) {
    alerts.push({
      type: 'severe_wind',
      severity: 'very_high',
      title: 'Severe Wind Alert',
      description: `Winds reaching ${current.wind_kph} km/h. Flying debris possible. Stay indoors and secure items.`,
      icon: 'Wind'
    });
  } else if (current?.wind_kph >= 50) {
    alerts.push({
      type: 'high_wind',
      severity: 'high',
      title: 'High Wind Warning',
      description: `Strong winds of ${current.wind_kph} km/h expected. Use caution when driving and avoid open areas.`,
      icon: 'Wind'
    });
  } else if (current?.wind_kph >= 30) {
    alerts.push({
      type: 'wind_advisory',
      severity: 'moderate',
      title: 'Wind Advisory',
      description: `Gusty winds up to ${current.wind_kph} km/h. Secure light outdoor items.`,
      icon: 'Wind'
    });
  }

  // ========== Visibility Alerts ==========
  if (current?.vis_km <= 0.5) {
    alerts.push({
      type: 'fog_alert',
      severity: 'very_high',
      title: 'Severe Fog Warning',
      description: `Visibility reduced to ${current.vis_km} km. Travel is extremely dangerous. Delay travel if possible.`,
      icon: 'Eye'
    });
  } else if (current?.vis_km < 1) {
    alerts.push({
      type: 'low_visibility',
      severity: 'high',
      title: 'Dense Fog Alert',
      description: `Visibility is ${current.vis_km} km. Drive slowly with headlights on.`,
      icon: 'Eye'
    });
  } else if (current?.vis_km < 5) {
    alerts.push({
      type: 'moderate_fog',
      severity: 'moderate',
      title: 'Foggy Conditions',
      description: `Visibility around ${current.vis_km} km. Use fog lights and drive carefully.`,
      icon: 'Eye'
    });
  }

  // ========== Precipitation Alerts ==========
  if (forecast?.forecastday?.[0]?.day?.daily_chance_of_rain >= 90) {
    alerts.push({
      type: 'heavy_rain_warning',
      severity: 'high',
      title: 'Heavy Rain Expected',
      description: `Chance of rain is ${forecast.forecastday[0].day.daily_chance_of_rain}%. Risk of waterlogging and traffic delays.`,
      icon: 'CloudRain'
    });
  } else if (forecast?.forecastday?.[0]?.day?.daily_chance_of_rain >= 60) {
    alerts.push({
      type: 'rain_likely',
      severity: 'moderate',
      title: 'Moderate Rain Expected',
      description: `Chance of rain is ${forecast.forecastday[0].day.daily_chance_of_rain}%. Carry an umbrella and drive safely.`,
      icon: 'CloudRain'
    });
  }

  // ========== Air Quality Alerts ==========
  const air_quality = current?.air_quality;
  if (air_quality) {
    const aqi = Math.max(air_quality.pm2_5 || 0, air_quality.pm10 || 0, air_quality.o3 || 0);

    if (aqi >= 200) {
      alerts.push({
        type: 'air_quality_hazardous',
        severity: 'very_high',
        title: 'Hazardous Air Quality',
        description: `Air quality index is ${aqi}. Stay indoors with windows closed. Avoid all outdoor exertion.`,
        icon: 'Haze'
      });
    } else if (aqi >= 150) {
      alerts.push({
        type: 'air_quality_unhealthy',
        severity: 'high',
        title: 'Unhealthy Air Quality',
        description: `AQI is ${aqi}. Sensitive groups should avoid outdoor activity.`,
        icon: 'Haze'
      });
    } else if (aqi >= 100) {
      alerts.push({
        type: 'air_quality_moderate',
        severity: 'moderate',
        title: 'Moderate Air Quality',
        description: `AQI is ${aqi}. Limited outdoor exposure recommended for those with respiratory issues.`,
        icon: 'Haze'
      });
    }
  }

  return alerts;
};

// Utilities to map AQI to level and colors =====================================================================================
// ==============================================================================================================================
export const getAQILevel = (index) => {
  switch (index) {
    case 1: return "Good";
    case 2: return "Moderate";
    case 3: return "Unhealthy for Sensitive Groups";
    case 4: return "Unhealthy";
    case 5: return "Very Unhealthy";
    case 6: return "Hazardous";
    default: return "Unknown";
  }
};

export const getAQITextColor = (index) => {
  switch (index) {
    case 1: return "text-green-700";
    case 2: return "text-yellow-600";
    case 3: return "text-orange-600";
    case 4: return "text-red-600";
    case 5: return "text-purple-700";
    case 6: return "text-rose-900";
    default: return "text-gray-600";
  }
};

export const getAQIColor = (index) => {
  switch (index) {
    case 1: return "bg-green-500";
    case 2: return "bg-yellow-400";
    case 3: return "bg-orange-500";
    case 4: return "bg-red-500";
    case 5: return "bg-purple-600";
    case 6: return "bg-rose-800";
    default: return "bg-gray-400";
  }
};


// =========== ACTIVITY SUGGESTIONS LOGIC ==========================================================================================
// =================================================================================================================================
export const generateActivitySuggestions = (current) => {
  const suggestions = [];

  const temp = current?.temp_c;
  const humidity = current?.humidity;
  const windSpeed = current?.wind_kph;
  const uvIndex = current?.uv;
  const condition = current?.condition.text.toLowerCase();

  // Temperature-based activities
  if (temp >= 20 && temp <= 28 && !condition.includes('rain')) {
    suggestions.push({
      activity: 'Perfect for outdoor jogging',
      reason: `Ideal temperature (${temp}°C) for running`,
    });

    suggestions.push({
      activity: 'Great for cycling',
      reason: 'Comfortable temperature for biking',
    });
  }

  if (temp > 30) {
    suggestions.push({
      activity: 'Stay indoors during peak hours',
      reason: `High temperature (${temp}°C) - avoid 11 AM to 4 PM`,
    });

    suggestions.push({
      activity: 'Swimming or water activities',
      reason: 'Hot weather perfect for cooling off',
    });
  }

  if (temp < 10) {
    suggestions.push({
      activity: 'Indoor activities recommended',
      reason: `Cold temperature (${temp}°C) - stay warm`,
    });
  }

  // Wind-based activities
  if (windSpeed >= 15 && windSpeed <= 30) {
    suggestions.push({
      activity: 'Excellent for kite flying',
      reason: `Good wind speed (${windSpeed} km/h)`,
    });

    suggestions.push({
      activity: 'Great for sailing',
      reason: 'Perfect wind conditions',
    });
  }

  // UV Index recommendations
  if (uvIndex > 7) {
    suggestions.push({
      activity: 'Avoid sun exposure 10 AM - 4 PM',
      reason: `Very high UV index (${uvIndex})`,
    });
  }

  if (uvIndex >= 3 && uvIndex <= 6) {
    suggestions.push({
      activity: 'Good for outdoor photography',
      reason: 'Moderate UV with good lighting',
    });
  }

  // Weather condition specific
  if (condition?.includes('clear') || condition?.includes('sunny')) {
    suggestions.push({
      activity: 'Perfect for picnics',
      reason: 'Clear skies and good visibility',
    });
  }

  if (condition?.includes('rain')) {
    suggestions.push({
      activity: 'Indoor movie or reading time',
      reason: 'Rainy weather - perfect for cozy indoor activities',
    });
  }

  // Humidity-based suggestions
  if (humidity > 80) {
    suggestions.push({
      activity: 'Avoid intense outdoor exercise',
      reason: `High humidity (${humidity}%) makes exercise harder`,
    });
  }

  // Sort by score and return top suggestions
  return suggestions;
};


// ========== CLOTHING RECOMMENDATIONS =============================================================================================
// =================================================================================================================================
export const generateClothingRecommendations = (current) => {
  const temp = current?.temp_c;
  const condition = current?.condition?.text?.toLowerCase() || '';
  const windSpeed = current?.wind_kph;
  const humidity = current?.humidity;

  let tempRec = [];
  let weatherRec = [];
  let bg = 'bg-slate-100';
  let tempBorderColor = 'border-l-gray-700'
  let weatherBorderColor = 'border-l-blue-700'
  let weatherBg = 'bg-sky-100';

  // Temperature-based recommendations
  if (temp > 35) {
    tempRec = [
      'Extreme heat: Wear breathable, lightweight fabrics such as cotton or linen.',
      'Use sun protection – sunglasses, a wide-brimmed hat, and SPF 30+ sunscreen.',
      'Avoid outdoor activities during peak sun hours (12 PM to 3 PM).',
      'Stay indoors in air-conditioned spaces if possible.',
    ];
    bg = 'bg-purple-100';
    tempBorderColor = 'border-l-purple-700'
  } else if (temp > 28) {
    tempRec = [
      'Hot weather: Choose light, airy clothing in bright or pastel colors.',
      'Stay hydrated – carry a reusable water bottle.',
      'Wear UV-protection sunglasses and a cap or hat.',
    ];
    bg = 'bg-red-100';
    tempBorderColor = 'border-l-red-700'
  } else if (temp > 20) {
    tempRec = [
      'Warm conditions: T-shirts, light shirts, and breathable pants like chinos are ideal.',
      'Light layers can help adapt to fluctuating indoor temperatures.',
    ];
    bg = 'bg-red-50';
    tempBorderColor = 'border-l-red-700'
  } else if (temp >= 12) {
    tempRec = [
      'Mild weather: Wear full-sleeve shirts or light sweaters.',
      'A hoodie or light jacket is recommended, especially for evenings.',
      'Opt for closed shoes instead of sandals.',
    ];
    bg = 'bg-yellow-50';
    tempBorderColor = 'border-l-yellow-700'
  } else if (temp >= 5) {
    tempRec = [
      'Chilly conditions: Dress in layers – thermal innerwear, sweaters, and a wind-resistant jacket.',
      'Cover extremities – wear gloves, a scarf, and insulated shoes.',
      'Keep a warm hat or beanie on hand.',
    ];
    bg = 'bg-blue-50';
    tempBorderColor = 'border-l-blue-700'
  } else if (temp <= 5) {
    tempRec = [
      'Freezing temperatures: Heavy winter wear is essential – insulated jackets, sweaters, and base layers.',
      'Wear thermal socks, boots, gloves, and a beanie or ear-covering cap.',
      'Consider a face covering to protect from cold winds.',
    ];
    bg = 'bg-blue-100';
    tempBorderColor = 'border-l-blue-700'
  }

  // Weather condition-based adjustments
  if (condition.includes('rain') || condition.includes('shower') || condition.includes('thunder')) {
    weatherRec.push('Rainy: Carry a waterproof jacket or umbrella.');
    weatherRec.push('Rainy: Wear waterproof or quick-drying shoes.');
    weatherRec.push('Rainy: Avoid loose clothing that soaks easily.');
    weatherBg = 'bg-blue-200';
    weatherBorderColor = 'border-l-blue-700'
  } else if (condition.includes('sunny') || condition.includes('clear')) {
    weatherRec.push('Sunny: Wear sunglasses and use sunscreen.');
    weatherRec.push('Sunny: A hat or cap is helpful to reduce heat exposure.');
    weatherBg = 'bg-yellow-100';
    weatherBorderColor = 'border-l-yellow-700'
  }
  if (windSpeed > 20) {
    weatherRec.push('Windy: Wear windproof outer layers to stay warm.');
    weatherRec.push('Windy: Consider using protective eyewear to shield from dust.');
    weatherBg = 'bg-cyan-100';
    weatherBorderColor = 'border-l-cyan-700'
  }
  if (humidity > 70) {
    weatherRec.push('High humidity: Choose moisture-wicking, quick-dry fabrics.');
    weatherRec.push('High humidity: Avoid wearing multiple layers.');
    weatherBg = 'bg-teal-100';
    weatherBorderColor = 'border-l-teal-700'
  }

  const clothingRec = { tempRec, weatherRec, bg, weatherBg, tempBorderColor, weatherBorderColor }
  return clothingRec;
};