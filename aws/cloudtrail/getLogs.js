import { cloudtrail } from "../services.js";

const getLogs = (projectName) => {
  const tables = [
    `LockitDev${projectName}`,
    `LockitStg${projectName}`,
    `LockitProd${projectName}`,
  ];
  const params = {
    LookupAttributes: [
      {
        AttributeKey: "ResourceType",
        AttributeValue: "AWS::DynamoDB::Table",
      },
      {
        AttributeKey: "ResourceName",
        AttributeValue: `LockitDev${projectName}`,
      },
    ],
  };

  cloudtrail.lookupEvents(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      const filteredData = data.Events.filter((event) =>
        tables.includes(event.Resources[0].ResourceName)
      );

      const formattedData = filteredData.map((event) => {
        return {
          eventName: event.EventName,
          eventTime: event.EventTime,
          username: event.Username,
          tableName: event.Resources[0].ResourceName,
        };
      });
      // not sure how we want these logs structured, so I used this for starteßrs
      console.log(formattedData);
      return formattedData;
    }
  });
};

export default getLogs;
