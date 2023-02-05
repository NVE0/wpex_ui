import { TimePicker } from 'antd';
import dayjs, {Dayjs} from 'dayjs';
import { useState } from 'react';
import { TableListItem } from './planning';

export function TimeSelector_StartDate(props: { onDone: () => void, element: TableListItem }) {

    return (

        <TimePicker
            onChange={(value) => console.warn(value?.toDate())}
            showSecond={false}
            value={props.element.start_date ? dayjs(props.element.start_date) : undefined}
            bordered={false}
            format={'HH:mm'}
            onSelect={(value) => {
                props.element.start_date = value?.toDate().toISOString();
                props.onDone();
            }}
            tabIndex={2}

        />

    )
}

export function TimeSelector_EndDate(props: { onDone: () => void, element: TableListItem }) {

    return (

        <TimePicker
            onChange={(value) => console.warn(value?.toDate())}
            showSecond={false}
            value={props.element.end_date ? dayjs(props.element.end_date) : undefined}
            bordered={false}
            format={'HH:mm'}
            onSelect={(value) => {
                props.element.end_date = value?.toDate().toISOString();
                props.onDone();
            }}
            tabIndex={2}

        />

    )
}



