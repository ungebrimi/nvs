import React, { useEffect, useState } from 'react'

const OpeningHours = ({ store }: any) => {
  const [openingHours, setOpeningHours] = useState([])

  useEffect(() => {
    const openingHours: any = [];
    if (store.opening_hours) {
      for (let i = 0; i < store.opening_hours.length; i++) {
        const day = store.opening_hours[i];
        // create a switch statement that change day.day from english to french
        switch (day.day) {
          case "monday":
            day.day = "Lundi";
            break;
          case "tuesday":
            day.day = "Mardi";
            break;
          case "wednesday":
            day.day = "Mercredi";
            break;
          case "thursday":
            day.day = "Jeudi";
            break;
          case "friday":
            day.day = "Vendredi";
            break;
          case "saturday":
            day.day = "Samedi";
            break;
          case "sunday":
            day.day = "Dimanche";
            break;
          default:
            break;
        }
        openingHours.push(day);
      }
    }
    setOpeningHours(openingHours);
  }, [store]);

  return (
    <>
      {openingHours &&
        openingHours.map((opening_hour: any, index: number) => {
          return (
            <div key={index} className="flex text-white max-w-[15rem] justify-between items-start gap-8 border-b-2 border-vol">
              <h3 className="mt-2 font-medium">
                {" "}
                {opening_hour.day}:{" "}
              </h3>
              <ul className="list-disc mt-2 w-28">
                {opening_hour.open.length > 0 ? (
                  <>
                    <li className="">
                      {opening_hour.open[0]} -{" "}
                      {opening_hour.closed[0]}
                    </li>
                    {opening_hour.open[1] && (
                      <li>
                        {opening_hour.open[1]} -{" "}
                        {opening_hour.closed[1]}
                      </li>
                    )}
                  </>
                ) : (
                  <li>Fermé</li>
                )}
              </ul>
            </div>
          );
        })}
    </>
  )
}

export default OpeningHours
