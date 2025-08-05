export const marianSites = [
  { id: "fatima", name: "파티마", country: "포르투갈" },
  { id: "lourdes", name: "루르드", country: "프랑스" },
  { id: "guadalupe", name: "과달루페", country: "멕시코" },
  { id: "banneux", name: "바뇌", country: "벨기에" },
  { id: "medjugorje", name: "메주고리예", country: "보스니아" }
];

export const getMarianSitesWithActive = (activeId: string) => {
  return marianSites.map(site => ({
    ...site,
    active: site.id === activeId
  }));
};