export type ItunesCatalogResponse = {
  feed: {
    entry: ItunesCatalogEntry[]
  }
}

export type ItunesCatalogEntry = {
  'im:name': ItunesLabel
  'im:image': ItunesImage[]
  summary: ItunesLabel
  id: ItunesId
  'im:artist': ItunesLabel
}

type ItunesLabel = {
  label: string
}

type ItunesImage = ItunesLabel & {
  attributes: {
    height: string
  }
}

type ItunesId = ItunesLabel & {
  attributes: {
    'im:id': string
  }
}
