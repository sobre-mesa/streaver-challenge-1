import { NextResponse } from "next/server";
import { handleError} from '../utils/errorHandling';
import { GenericPOSTData } from "@/types/PostRequestBody";

export interface GenericPOSTParams {
  model: any;
  data: GenericPOSTData;
  validationField?: string//keyof GenericPOSTData;
}

export async function genericPOST({ model, data, validationField} : GenericPOSTParams)  {
  try {
    if(validationField) {
      const exists = await model.findMany({
        where: {
          [validationField]: data[validationField as keyof GenericPOSTData],
        },
      });
      if (exists.length > 0) {
        return NextResponse.json({ error: "Record already exists" }, { status: 400 });
      } else {
        const response = await model.create({
          data,
        });
        return NextResponse.json(response);
      }
    }
    else {
      const response = await model.create({
        data,
      });
      return NextResponse.json(response); 
    }
    
  } catch (error) {
    return handleError(error);
  }
}

export async function genericGetAll(model: any) {
  try {
     const data = await model.findMany();
     return NextResponse.json(data);
  } catch (error) {
     return handleError(error);
  } 
}
