import { VuiCallout, VuiText, VuiTextColor } from "../../../ui";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchError: any;
};

export const SearchErrorCallout = ({ searchError }: Props) => {
  // Log for diagnostics.
  console.error("searchError", searchError);

  return (
    <VuiCallout
      title="There was an error while searching"
      color="danger"
      headingElement="h2"
    >
      {searchError.message && (
        <VuiText>
          <p>
            <VuiTextColor color="danger">{searchError.message}</VuiTextColor>
          </p>
        </VuiText>
      )}

      {searchError.response?.data?.message && (
        <VuiText>
          <p>
            <VuiTextColor color="danger">
              {searchError.response.data.message}
            </VuiTextColor>
          </p>
        </VuiText>
      )}
    </VuiCallout>
  );
};
