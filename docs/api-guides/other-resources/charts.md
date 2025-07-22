---
sidebar_position: 2
---

# Charts

## GET /api/v1/charts/chartid

### URL Parameters:

- `height` -> optional - height in pixels for the image  
  If not provided then it uses the same height defined in the chart, or 100 if not defined in chart  
- `width` -> optional - width in pixels for the image  
  If not provided then it uses the height defined in the chart, or 100 if not defined in chart  
- `json` -> optional  
  If this parameter is present, the image is returned base64 encoded in `data` element of JSON  
  When not present, the image file is returned directly in PNG format

### Returns:

The image generated from the chart.  
**Note:** This image is generated using the old JFreeChart library, not the new billboard, so it may have an outdated look.

### Example:

`GET /api/v1/charts/50002?width=800&height=600&json`

## GET /api/v1/charts/chartid/data

### Returns:

The data from the chart that you can use to create graphics in your custom solution.

### Example:

`GET /api/v1/charts/50002/data`