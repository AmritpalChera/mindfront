export function stringToJSON(jsonString: string) {
  if (!jsonString) return {};
  try {
    jsonString = jsonString.replace(" ", "");
    const pairs = jsonString.split(',');
    let output = '';
    pairs.forEach((pair) => {
      const [key, value] = pair.split(':');
    
      // Format the key with double quotes
      const formattedKey = `"${key.trim()}"`;
    
      // Check if the value is a valid number
      const formattedValue = isNaN(parseFloat(value.trim())) ? `"${value.trim()}"` : value.trim();
    
      // Concatenate the formatted key-value pair
      output += `${formattedKey}:${formattedValue},`;
      
    });
    output = `{${output.slice(0, -1)}}`;
    
    var o = JSON.parse(`${output}`);
    if (o && typeof o === "object") {
        return o;
    }
  }
  catch (e) {
    console.log('error is: ', e)
   }

  return false;
};

export function JSONtoString(json: JSON) {
  const data = JSON.stringify(json);
  let o = data.slice(1, -1);
  o = o.replaceAll("\"", "");
  return o;
}