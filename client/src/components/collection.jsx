import { SimpleGrid } from "@chakra-ui/react";
import NFTCard from "../templates/NFTCard";
import React from "react";

const Collection = ({ bundles }) => {
  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
      {bundles.map(({ assets }) => {
        return assets.map(
          ({ name, image_url, id, permalink, asset_contract, description }) => {
            return (
              <NFTCard
                desc={description}
                img={image_url}
                name={name}
                key={id}
                opensea={permalink}
                project={asset_contract.external_link}
              />
            );
          }
        );
      })}
    </SimpleGrid>
  );
};

export default Collection;
