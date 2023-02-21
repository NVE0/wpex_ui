import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { PlanningData } from './planning';

export function DateSelectorX(props: { onDone: () => void, element: PlanningData, index: number }) {

    return (

        <DatePicker
            allowClear={false}
            value={props.element.start_date ? dayjs(props.element.start_date) : undefined}
            showTime={false}
            format={'DD/MM/YYYY'}
            onChange={(value) => {
                props.element.start_date = value?.toDate().toISOString() || "";
                props.onDone();
            }}
            style={{width: 100, padding: 0, textAlign: "center"}}
            bordered={false}
            suffixIcon={null}
            tabIndex={props.index * 3 + 1}
            clearIcon={null}
        />
        
    )
}

export function TimeSelector_StartDate(props: { onDone: () => void, element: PlanningData, index: number }) {

    return (

        <TimePicker
            style={{width: 40, borderTop: "solid green 1px", borderBottom: "solid red 0px", padding: 0, textAlign: "center", paddingLeft:3}}
            // style={{width: 40, border: "solid green 1px", padding: 0, textAlign: "center", paddingLeft:3}}
            onChange={(value) => console.warn(value?.toDate())}
            showSecond={false}
            value={props.element.start_date ? dayjs(props.element.start_date) : undefined}
            bordered={true}
            format={'HH:mm'}
            onSelect={(value) => {
                props.element.start_date = value?.toDate().toISOString();
                props.onDone();
            }}
            suffixIcon={null}
            tabIndex={props.index * 3 + 2}
            clearIcon={null}

        />

    )
}

export function TimeSelector_EndDate(props: { onDone: () => void, element: PlanningData, index: number }) {

    return (

        <TimePicker
            style={{width: 40, borderTop:"solid red 1px", borderBottom: "solid red 0px", padding: 0, marginLeft: 5, paddingLeft:3}}
            // style={{width: 40, border: "solid red 1px", padding: 0, textAlign: "center", paddingLeft:3, marginLeft: 5}}
            onChange={(value) => console.warn(value?.toDate())}
            showSecond={false}
            value={props.element.end_date ? dayjs(props.element.end_date) : undefined}
            bordered={true}
            format={'HH:mm'}
            onSelect={(value) => {
                props.element.end_date = value?.toDate().toISOString();
                props.onDone();
            }}
            suffixIcon={null}
            tabIndex={props.index * 3 + 3}
            clearIcon={null}

        />

    )
}



