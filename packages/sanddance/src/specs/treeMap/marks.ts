// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { fill } from '../fill';
import { ScaleNames } from '../constants';
import { Mark } from 'vega-typings';
import { SpecColumns, SpecViewOptions } from '../types';
import { zeroIfCollapsed } from '../selection';

export default function (data: string, columns: SpecColumns, specViewOptions: SpecViewOptions) {
    const marks: Mark[] = [
        {
            "type": "rect",
            "from": {
                data
            },
            "encode": {
                "update": {
                    "x": { "field": "x0" },
                    "y": { "field": "y0" },
                    "x2": { "field": "x1" },
                    "y2": { "field": "y1" },
                    "fill": fill(columns.color, specViewOptions)
                }
            }
        }
    ];
    if (columns.z) {
        const update = marks[0].encode.update;
        update.z = {
            "value": 0
        };
        update.depth = zeroIfCollapsed({
            "scale": ScaleNames.Z,
            "field": columns.z.name
        });
    }
    return marks;
}
