import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormButton, ExpTextField } from 'components';
import { Grid } from '@material-ui/core';
import FanbandSelector from './FanbanSelector';

const schema = yup
  .object({
    barcode: yup.string().required(),
    section: yup.string().required(),
    row: yup.string().required(),
    seat: yup.string().required(),
    order: yup.string().required(),
    fanband: yup.string().required(),
  })
  .required();

export default function TicketForm() {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      barcode: '',
      section: '',
      row: '',
      seat: '',
      order: '',
      fanband: '',
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="barcode"
            label="Barcode"
            placeholder="Barcode"
            error={errors.barcode?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="section"
            label="Section"
            placeholder="Section"
            error={errors.section?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="row"
            label="Row"
            placeholder="Row"
            error={errors.row?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="seat"
            label="Seat"
            placeholder="Seat"
            error={errors.seat?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="order"
            label="Order"
            placeholder="Order"
            error={errors.order?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="fanband"
            label="Assign to fanband"
            placeholder="Assign to fanband"
            error={errors.fanband?.message}
            fullWidth
            as={<FanbandSelector />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton type="submit" color="primary">
            Save
          </FormButton>
        </Grid>
      </Grid>
    </form>
  );
}
