import { useEffect, useState } from "react";
import UploadSelect from "./UploadSelect";
import UploadText from "./UploadText";
import UploadPdf from "./UploadPdf";
import UploadWeb from "./UploadWeb";
import { useSearchParams } from "next/navigation";
import UploadAudio from "./UploadAudio";

export default function Upload() {
  const [uploadType, setUploadType] = useState('');
  const params = useSearchParams();

  useEffect(() => {
    if (params) {
      const type = params.get('uploadtype');
      if (type) setUploadType(type);
    }
  }, [params])

  const getRender = () => {
    if (uploadType === 'webpage') return <UploadWeb setUploadType={setUploadType} />
    else if (uploadType === 'pdf') return <UploadPdf setUploadType={setUploadType} />
    else if (uploadType === 'text') return <UploadText setUploadType={setUploadType} />
    else if (uploadType === 'audio') return <UploadAudio setUploadType={setUploadType} />
    else return <UploadSelect setUploadType={setUploadType} />
  }

  return (
    <div>
      {getRender()}
    </div>
  )
}