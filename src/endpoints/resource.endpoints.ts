import { Request, Response } from "express";

import { AppContainerInstance } from '../ioc/ioc.init';

import { ResourceInteractor } from "../interactors/resource.interactors";

export const getResourceByID = async (req: Request, res: Response) => {
    const resourceType = req.params[0];
    const resourceID = req.params[2];

    const resourceInteractor: ResourceInteractor = AppContainerInstance.getContainerItem(
        resourceType,
    );

    const endpointResult = await resourceInteractor.getResource(resourceID);

    res.status(endpointResult.statusCode).send(endpointResult.result);
}
