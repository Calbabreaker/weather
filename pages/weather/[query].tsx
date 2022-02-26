import { GetServerSideProps } from "next/types";
import { CurrentWeatherResponse, getCurrentWeather } from "lib/weather";
import { WeatherBox } from "components/WeatherBox";
import Head from "next/head";

interface Props {
    data: CurrentWeatherResponse;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    if (typeof params?.query != "string") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const data = await getCurrentWeather(params.query);
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
                <Head>
                    <title>{data.location.name}</title>
                </Head>
                <WeatherBox data={data} />
            </>
        );
    }
}
