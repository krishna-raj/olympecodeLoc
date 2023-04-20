import { registerBrick } from 'olympe';
import { ReactBrick, useProperty } from '@olympeio/core';

import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default class CheckBox extends ReactBrick {
    static getReactComponent($) {
        return () => {
            const checked = useProperty($, 'checked');
            return (
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
                
            );
        };
    }
}
registerBrick('01876bf82717874064ff', CheckBox);
