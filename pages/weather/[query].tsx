import { GetServerSideProps } from "next/types";
import { ForecastResponse, formatLocation, getForecast } from "lib/weather";
import { WeatherBox } from "components/WeatherBox";
import Head from "next/head";
import { Forecast } from "components/Forecast";

interface Props {
    data: ForecastResponse;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    if (typeof params?.query != "string") {
        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }

    const data = await getForecast(params.query, 1);
    return {
        props: { data },
    };
};

export default function Weather({ data }: Props) {
    if (data.error) {
        return <div>{data.error.message}</div>;
    } else {
        return (
            <>
                <h2>{formatLocation(data.location)}</h2>
                <Head>
                    <title>{formatLocation(data.location)} - Weather</title>
                </Head>
                <WeatherBox weather={data.current} />
                <Forecast days={data.forecast.forecastday} />
            </>
        );
    }
}
